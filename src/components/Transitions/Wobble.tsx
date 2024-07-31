import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { WobbleProps } from './TransitionsTypes';
import { createWobbleAnimation } from './utils';

export const Wobble: React.FC<WobbleProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const wobbleAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(createWobbleAnimation(translateX, rotate, duration), {
          iterations: repeatCount,
          resetBeforeIteration: true,
        }),
      ]);

      wobbleAnimation.start();
    }
  }, [translateX, rotate, duration, delay, repeatCount, applyTransition]);

  const rotateInterpolation = rotate.interpolate({
    inputRange: [-5, 0, 5],
    outputRange: ['-5deg', '0deg', '5deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ translateX }, { rotate: rotateInterpolation }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
