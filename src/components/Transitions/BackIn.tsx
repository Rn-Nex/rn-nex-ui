import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { BackInProps } from './TransitionsTypes';

const getInitialValue = (type: BackInProps['type'], initialValue?: number) => {
  return initialValue !== undefined ? initialValue : type === 'down' || type === 'up' ? 1000 : 1000;
};

const getTransformStyle = (type: BackInProps['type'], translate: Animated.Value) => {
  return type === 'down' || type === 'up' ? { translateY: translate } : { translateX: translate };
};

export const BackIn: React.FC<BackInProps> = ({
  style,
  children,
  duration = 1000,
  delay = 0,
  type,
  applyTransition = false,
  initialValue,
  ...props
}) => {
  const initial = getInitialValue(type, initialValue);
  const translate = useRef(new Animated.Value(initial)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      translate.setValue(initial);
      opacity.setValue(0);

      const backInAnimation = Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translate, {
            toValue: 0,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]);

      backInAnimation.start();
    }
  }, [translate, opacity, duration, delay, applyTransition, initial]);

  const transformStyle = getTransformStyle(type, translate);

  return (
    <Animated.View
      style={[
        {
          transform: [transformStyle],
          opacity,
        },
        style,
      ]}
      {...props}>
      {children}
    </Animated.View>
  );
};
