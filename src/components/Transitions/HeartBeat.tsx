import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { HeartBeatProps } from './Transitions.types';
import { createHeartBeatAnimation } from './utils';

export const HeartBeat: React.FC<HeartBeatProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (applyTransition) {
      const heartBeatAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(createHeartBeatAnimation(scale, duration), {
          iterations: repeatCount,
          resetBeforeIteration: true,
        }),
      ]);

      heartBeatAnimation.start();
    }
  }, [scale, duration, delay, repeatCount, applyTransition]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
