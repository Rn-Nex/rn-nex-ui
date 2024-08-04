import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { useTheme } from '../../libraries';
import { AnimatedView, Box } from '../Box';
import { Text } from '../Typography';
import { BadgeContainerProps, BadgeProps } from './BadgeTypes';
import { BADGE_ANIMATION_DURATION, BADGE_MAX_DEFAULT_VALUE } from './constants';
import { badgeContentDefaultStyles, generateBadgeContainerStyles, generateBadgeStyles } from './utils';

const BadgeContainer = React.forwardRef<View, BadgeContainerProps>(({ children, style, overlap, ...props }, ref) => {
  return (
    <Box ref={ref} style={[generateBadgeContainerStyles({ overlap }), style]} {...props}>
      {children}
    </Box>
  );
});

export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      children,
      style,
      badgeContent,
      variation = 'secondary',
      invisible,
      badgeAnimationDuration,
      badgeContentProps,
      max,
      variant,
      anchorOrigin,
      badgeContainerProps,
      overlap = 'rectangular',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [badgeContainerLayoutRect, setBadgeContainerLayoutRect] = useState<LayoutRectangle>();
    const badgeVisibility = useRef(new Animated.Value(0)).current;
    const maxValueLimit = max || BADGE_MAX_DEFAULT_VALUE;

    const badgeStyles = useMemo(() => {
      if (badgeContainerLayoutRect) {
        return generateBadgeStyles({
          rootElementRect: badgeContainerLayoutRect,
          variation,
          badgeVisibility,
          variant,
          anchorOrigin,
          theme,
        });
      }
    }, [badgeContainerLayoutRect, variation, badgeVisibility, variant, anchorOrigin, theme]);

    const badgeContainerLayoutHandler = useCallback((event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      setBadgeContainerLayoutRect(layout);
    }, []);

    const renderBadgeContent = function (content: BadgeProps['badgeContent']) {
      if (variant === 'dot') return null;

      if (typeof content === 'string' || typeof content === 'number') {
        const badgeNumber = Number(badgeContent);

        if (isNaN(badgeNumber)) {
          return (
            <Text style={[badgeContentDefaultStyles({ variation })]} {...badgeContentProps}>
              {content}
            </Text>
          );
        }

        return (
          <Text style={[badgeContentDefaultStyles({ variation })]} {...badgeContentProps}>
            {badgeNumber >= maxValueLimit ? maxValueLimit - 1 + '+' : badgeNumber}
          </Text>
        );
      } else if (typeof content === 'object') throw new Error('Badge content must be a string or number');
    };

    useEffect(() => {
      badgeVisibility.stopAnimation();
      Animated.timing(badgeVisibility, {
        toValue: badgeContent && !invisible ? 1 : 0,
        duration: badgeAnimationDuration || BADGE_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, [invisible, badgeContent]);

    return (
      <Fragment>
        <BadgeContainer overlap={overlap} onLayout={badgeContainerLayoutHandler} {...badgeContainerProps}>
          {children}
        </BadgeContainer>
        {badgeContainerLayoutRect ? (
          <AnimatedView ref={ref} style={[badgeStyles, style]} {...props}>
            {renderBadgeContent(badgeContent)}
          </AnimatedView>
        ) : null}
      </Fragment>
    );
  },
);

Badge.displayName = 'Badge';
