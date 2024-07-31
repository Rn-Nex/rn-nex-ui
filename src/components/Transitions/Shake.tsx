import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { ShakeProps } from './TransitionsTypes';

const defaultConfigForShakeAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

export const Shake: React.FC<ShakeProps> = ({
  style,
  children,
  type = 'x',
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const shakeAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translate, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: 10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: -10,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: 5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
              toValue: -5,
              duration: duration * 0.1,
              ...defaultConfigForShakeAnimation,
            }),
            Animated.timing(translate, {
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
  }, [translate, duration, delay, repeatCount, applyTransition]);

  return (
    <Animated.View
      style={[{ transform: [type == 'x' ? { translateX: translate } : { translateY: translate }] }, style]}
      {...props}>
      {children}
    </Animated.View>
  );
};
