import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { FlipProps } from './Transitions.types';

export const Flip: React.FC<FlipProps> = ({
  style,
  children,
  type = 'flip',
  duration = 1000,
  delay = 0,
  repeatCount = 1,
  applyTransition = false,
  ...props
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      const flipToValue = type.includes('Out') ? 1 : 0;
      const flipFromValue = type.includes('Out') ? 0 : 1;

      flipAnim.setValue(flipFromValue);

      const flipAnimation = Animated.sequence([
        Animated.timing(flipAnim, {
          toValue: flipToValue,
          duration: duration,
          delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnim, {
          toValue: flipFromValue,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(flipAnimation, { iterations: repeatCount }).start();
    }
  }, [flipAnim, duration, delay, repeatCount, applyTransition, type]);

  const flipInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle =
    type === 'flip' || type === 'flipInY' || type === 'flipOutY'
      ? { transform: [{ rotateX: flipInterpolate }] }
      : { transform: [{ rotateY: flipInterpolate }] };

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};
