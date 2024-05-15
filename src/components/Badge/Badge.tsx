import React, { Fragment, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, TextStyle, View } from 'react-native';
import { colors } from '../../libraries';
import { AnimatedView } from '../Box';
import { Text } from '../Typography';
import { BadgeContainerProps, BadgeProps } from './BadgeTypes';
import { BadgeContainerDefaultStyles, BadgeDefaultStyles, generateBadgeStyles } from './utils';

export const BadgeContentDefaultStyles: TextStyle = {
  color: colors.white.main,
  fontWeight: '400',
  fontSize: 11,
};

const BadgeContainer = React.forwardRef<View, BadgeContainerProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={[BadgeContainerDefaultStyles, style]} {...props}>
      {children}
    </View>
  );
});

export const Badge = React.forwardRef<View, BadgeProps>(
  ({ children, style, badgeContent, variation, invisible, ...props }, ref) => {
    const [badgeContainerLayoutRect, setBadgeContainerLayoutRect] = useState<LayoutRectangle>();

    const badgeContainerLayoutHandler = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      setBadgeContainerLayoutRect(layout);
    };

    const renderBadgeContent = function (content: BadgeProps['badgeContent']) {
      if (typeof content === 'string' || typeof content === 'number') {
        const badgeNumber = Number(badgeContent);

        if (isNaN(badgeNumber)) {
          return <Text style={BadgeContentDefaultStyles}>{content}</Text>;
        }

        return <Text style={BadgeContentDefaultStyles}>{badgeNumber >= 100 ? '99+' : badgeNumber}</Text>;
      } else if (typeof content === 'object') throw new Error('Badge content must be a string or number');
    };

    return (
      <Fragment>
        <BadgeContainer onLayout={badgeContainerLayoutHandler}>{children}</BadgeContainer>
        {badgeContainerLayoutRect ? (
          <AnimatedView
            ref={ref}
            style={[BadgeDefaultStyles, generateBadgeStyles({ rootElementRect: badgeContainerLayoutRect, variation }), style]}
            {...props}>
            {renderBadgeContent(badgeContent)}
          </AnimatedView>
        ) : null}
      </Fragment>
    );
  },
);
