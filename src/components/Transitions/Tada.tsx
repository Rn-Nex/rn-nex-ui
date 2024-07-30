import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TadaProps } from './TransitionsTypes';

const defaultConfigForShakeAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

const createTadaAnimation = (rotate: Animated.Value, scale: Animated.Value, duration: number) => {
  return Animated.sequence([
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.3,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.2,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.1,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: -10,
        duration: duration * 0.1,
        ...defaultConfigForShakeAnimation,
      }),
    ]),
    Animated.timing(rotate, {
      toValue: 0,
      duration: duration * 0.1,
      ...defaultConfigForShakeAnimation,
    }),
  ]);
};

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
    <Animated.View
      style={[
        {
          transform: [{ rotate: rotateInterpolation }, { scale }],
        },
        style,
      ]}
      {...props}>
      {children}
    </Animated.View>
  );
};
