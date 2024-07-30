import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { ShakeXProps } from './TransitionsTypes';

const defaultConfigForShakeAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

export const ShakeX: React.FC<ShakeXProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const shakeAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: 5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
              toValue: -5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translateX, {
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
  }, [translateX, duration, delay, repeatCount, applyTransition]);

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
