import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { ShakeYProps } from './TransitionsTypes';

const defaultConfigForShakeAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

export const ShakeY: React.FC<ShakeYProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const shakeAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateY, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: 5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: -5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
          ]),
          {
            iterations: repeatCount,
            resetBeforeIteration: true,
          },
        ),
      ]);

      shakeAnimation.start();
    }
  }, [translateY, duration, delay, repeatCount, applyTransition]);

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
