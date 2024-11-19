import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { Text } from '../Typography';
import { BadgeContainerProps, BadgeProps } from './Badge.types';
import { BADGE_ANIMATION_DURATION, BADGE_MAX_DEFAULT_VALUE, BADGE_TOP_RIGHT_POSITION } from './constants';
import { badgeContentDefaultStyles, generateBadgeContainerStyles, generateBadgeStyles } from './utils';

const BadgeContainer = React.forwardRef<View, BadgeContainerProps>(({ children, style, overlap, ...props }, ref) => {
  return (
    <Box ref={ref} style={[styles.badgeContainer, generateBadgeContainerStyles({ overlap }), style]} {...props}>
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
      invisible,
      badgeContentStyle,
      max,
      badgeAnimationDuration = BADGE_ANIMATION_DURATION,
      variant = 'badge',
      anchorOrigin = BADGE_TOP_RIGHT_POSITION,
      badgeContainerProps,
      containerStyles,
      variation = 'secondary',
      overlap = 'rectangular',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const badgeVisibility = useRef(new Animated.Value(0)).current;
    const maxValueLimit = max || BADGE_MAX_DEFAULT_VALUE;

    const badgeStyles = useMemo(() => {
      return generateBadgeStyles({
        variation,
        badgeVisibility,
        variant,
        anchorOrigin,
        theme,
      });
    }, [variation, badgeVisibility, variant, anchorOrigin, theme]);

    const renderBadgeContent = function (content: BadgeProps['badgeContent']) {
      if (variant === 'dot') return null;

      if (typeof content === 'string' || typeof content === 'number') {
        const badgeNumber = Number(badgeContent);

        if (isNaN(badgeNumber)) {
          return (
            <Text style={StyleSheet.flatten([styles.badgeContent, badgeContentDefaultStyles({ variation }), badgeContentStyle])}>
              {content}
            </Text>
          );
        }

        return (
          <Text style={StyleSheet.flatten([styles.badgeContent, badgeContentDefaultStyles({ variation }), badgeContentStyle])}>
            {badgeNumber >= maxValueLimit ? maxValueLimit - 1 + '+' : badgeNumber}
          </Text>
        );
      } else if (typeof content === 'object') throw new Error('Badge content must be a string or number');
    };

    useEffect(() => {
      badgeVisibility.stopAnimation();
      Animated.timing(badgeVisibility, {
        toValue: badgeContent && !invisible ? 1 : 0,
        duration: badgeAnimationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, [invisible, badgeContent]);

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyles])} ref={ref}>
        <BadgeContainer overlap={overlap} {...badgeContainerProps}>
          {children}
        </BadgeContainer>
        <Animated.View style={StyleSheet.flatten([styles.badge, badgeStyles, style])} {...props}>
          {renderBadgeContent(badgeContent)}
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  badgeContent: {
    fontWeight: '400',
    fontSize: 11,
  },
  container: {
    minWidth: 40,
    minHeight: 40,
    alignSelf: 'flex-start',
  },
  badgeContainer: {
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badge: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
});

Badge.displayName = 'Badge';
BadgeContainer.displayName = 'BadgeContainer';
