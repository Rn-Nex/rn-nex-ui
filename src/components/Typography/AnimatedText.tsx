import React from 'react';
import { Animated, Text } from 'react-native';
import { AnimatedTextProps } from './Text.types';

export const AnimatedText = React.forwardRef<Text, AnimatedTextProps>(({ children, style, ...props }, ref) => {
  return (
    <Animated.Text ref={ref} {...props} style={style}>
      {children}
    </Animated.Text>
  );
});
