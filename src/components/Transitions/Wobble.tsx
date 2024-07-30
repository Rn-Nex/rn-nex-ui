import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { WobbleProps } from './TransitionsTypes';

const defaultConfigForWobbleAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

const createWobbleAnimation = (translateX: Animated.Value, rotate: Animated.Value, duration: number) => {
  return Animated.sequence([
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -25,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: -5,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 20,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: 3,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -15,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: -3,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 10,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: 2,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -5,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: -1,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: duration * 0.1,
        ...defaultConfigForWobbleAnimation,
      }),
    ]),
  ]);
};

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
    <Animated.View
      style={[
        {
          transform: [{ translateX }, { rotate: rotateInterpolation }],
        },
        style,
      ]}
      {...props}>
      {children}
    </Animated.View>
  );
};
