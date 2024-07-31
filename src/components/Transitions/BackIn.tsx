import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { BackInProps } from './TransitionsTypes';

const INITIAL_DEFAULT_POSITION = 1000;
const DEFAULT_DURATION = 1000;
const DEFAULT_DELAY = 0;

export const BackIn: React.FC<BackInProps> = ({
  style,
  children,
  duration = DEFAULT_DURATION,
  delay = DEFAULT_DELAY,
  type,
  applyTransition = false,
  initialValue,
  ...props
}) => {
  const getInitialValue = useCallback(
    (type: BackInProps['type'], initialValue?: number) => {
      if (initialValue) {
        if (type === 'down' || type === 'right') {
          return -initialValue;
        } else {
          return initialValue;
        }
      } else {
        if (type === 'down' || type === 'right') {
          return -INITIAL_DEFAULT_POSITION;
        } else {
          return INITIAL_DEFAULT_POSITION;
        }
      }
    },
    [type, initialValue],
  );

  const initial = getInitialValue(type, initialValue);
  const translate = useRef(new Animated.Value(initial)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const getTransformStyle = useCallback(
    (type: BackInProps['type'], translate: Animated.Value) => {
      return type === 'down' || type === 'up' ? { translateY: translate } : { translateX: translate };
    },
    [type],
  );

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
    <Animated.View style={[{ transform: [transformStyle], opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
