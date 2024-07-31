import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { BounceProps } from './TransitionsTypes';

export const Bounce: React.FC<BounceProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  height = 30,
  applyTransition = false,
  repeatCount = 1,
  ...props
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const bounceAnimation = Animated.sequence([
        Animated.timing(translateY, {
          toValue: -height,
          duration: duration / 7,
          delay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(bounceAnimation, { iterations: repeatCount }).start();
    }
  }, [translateY, duration, delay, height, applyTransition]);

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
