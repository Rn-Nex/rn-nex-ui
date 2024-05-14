import React from 'react';
import { Animated, TextStyle, View, ViewStyle } from 'react-native';
import { BadgeContainerProps, BadgeProps } from './BadgeTypes';
import { colors } from '../../libraries';
import { Text } from '../Typography';
import { BadgeContainerDefaultStyles, BadgeDefaultStyles, generateBadgeStyles } from './utils';
import { AnimatedView } from '../Box';

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
    const renderBadgeContent = function (content: BadgeProps['badgeContent']) {
      if (typeof content === 'string' || typeof content === 'number') {
        return <Text style={BadgeContentDefaultStyles}>{content}</Text>;
      } else if (typeof content === 'object') return content;
    };

    return (
      <BadgeContainer>
        {children}
        <AnimatedView ref={ref} style={[BadgeDefaultStyles, generateBadgeStyles({ variation }), style]} {...props}>
          {renderBadgeContent(badgeContent)}
        </AnimatedView>
      </BadgeContainer>
    );
  },
);
