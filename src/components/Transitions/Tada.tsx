import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { TadaProps } from './Transitions.types';
import { createTadaAnimation } from './utils';

export const Tada: React.FC<TadaProps> = ({
  style,
  children,
  duration = 500,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (applyTransition) {
      const tadaAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(createTadaAnimation(rotate, scale, duration), {
          iterations: repeatCount,
          resetBeforeIteration: true,
        }),
      ]);

      tadaAnimation.start();
    }
  }, [rotate, scale, duration, delay, repeatCount, applyTransition]);

  const rotateInterpolation = rotate.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate: rotateInterpolation }, { scale }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
