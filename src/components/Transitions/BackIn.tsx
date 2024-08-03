import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { BACK_IN_DEFAULT_DELAY, BACK_IN_DEFAULT_DURATION } from './constants';
import { BackInProps } from './TransitionsTypes';
import { getBackInInitialValue } from './utils';

export const BackIn: React.FC<BackInProps> = ({
  style,
  children,
  duration = BACK_IN_DEFAULT_DURATION,
  delay = BACK_IN_DEFAULT_DELAY,
  type = 'down',
  applyTransition = false,
  initialValue,
  ...props
}) => {
  const getInitialValue = useCallback(
    (type: BackInProps['type'], initialValue?: number) => getBackInInitialValue(type, initialValue),
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
