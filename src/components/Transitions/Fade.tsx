import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { FadeProps } from './Transitions.types';

export const Fade: React.FC<FadeProps> = ({ style, children, duration = 300, delay = 0, applyTransition = false, ...props }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationConfig = {
      duration,
      delay,
      useNativeDriver: true,
    };

    const animation = Animated.timing(opacity, {
      ...animationConfig,
      toValue: applyTransition ? 1 : 0,
    });

    animation.start();
  }, [opacity, duration, delay, applyTransition]);

  return (
    <Animated.View style={[{ opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
