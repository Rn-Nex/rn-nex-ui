import { Animated, Easing } from 'react-native';
import {
  BACK_IN_INITIAL_DEFAULT_POSITION,
  FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE,
  FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
} from './constants';
import { BackInProps, FadingProps } from './TransitionsTypes';

type FadingInitialTransform = {
  translateX: number;
  translateY: number;
};

export const getFadingInitialTransform = (type: FadingProps['type']): FadingInitialTransform => {
  switch (type) {
    case 'fadeInDown':
    case 'fadeInDownBig':
    case 'fadeOutDown':
      return {
        translateY: type.endsWith('Big')
          ? -FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
          : -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateX: 0,
      };
    case 'fadeInUp':
    case 'fadeInUpBig':
      return {
        translateY: type.endsWith('Big')
          ? FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
          : FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateX: 0,
      };
    case 'fadeOutUp':
      return {
        translateY: 0,
        translateX: 0,
      };
    case 'fadeInLeft':
    case 'fadeInLeftBig':
      return {
        translateX: type.endsWith('Big')
          ? -FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
          : -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: 0,
      };
    case 'fadeInRight':
    case 'fadeInRightBig':
      return {
        translateX: type.endsWith('Big')
          ? FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
          : FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: 0,
      };
    case 'fadeInTopRight':
      return {
        translateX: FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
      };
    case 'fadeInTopLeft':
      return {
        translateX: -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
        translateY: -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
      };
    default:
      return { translateX: 0, translateY: 0 };
  }
};

export const getFadingFinalTransform = (type: FadingProps['type']) => {
  if (type.startsWith('fadeIn')) {
    return { translateX: 0, translateY: 0, opacity: 1 };
  } else {
    switch (type) {
      case 'fadeOutDown':
        return {
          translateY: type.endsWith('Big')
            ? FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
            : FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
          opacity: 0,
        };
      case 'fadeOutUp':
        return {
          translateY: type.endsWith('Big')
            ? -FADING_DEFAULT_INITIAL_LARGE_POSITION_VALUE
            : -FADING_DEFAULT_INITIAL_SMALL_POSITION_VALUE,
          opacity: 0,
        };
      default:
        return { opacity: 0 };
    }
  }
};

export const getBackInInitialValue = (type: BackInProps['type'], initialValue?: number) => {
  if (initialValue) {
    if (type === 'down' || type === 'right') {
      return -initialValue;
    } else {
      return initialValue;
    }
  } else {
    if (type === 'down' || type === 'right') {
      return -BACK_IN_INITIAL_DEFAULT_POSITION;
    } else {
      return BACK_IN_INITIAL_DEFAULT_POSITION;
    }
  }
};

export const defaultConfigForHeartBeatAnimation = {
  useNativeDriver: true,
};

export const createHeartBeatAnimation = (scale: Animated.Value, duration: number) => {
  return Animated.sequence([
    Animated.timing(scale, {
      toValue: 1.3,
      duration: duration * 0.14,
      ...defaultConfigForHeartBeatAnimation,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: duration * 0.14,
      ...defaultConfigForHeartBeatAnimation,
    }),
    Animated.timing(scale, {
      toValue: 1.3,
      duration: duration * 0.14,
      ...defaultConfigForHeartBeatAnimation,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: duration * 0.14,
      ...defaultConfigForHeartBeatAnimation,
    }),
  ]);
};

export const defaultConfigForShakeAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

export const createTadaAnimation = (rotate: Animated.Value, scale: Animated.Value, duration: number) => {
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

export const defaultConfigForWobbleAnimation = {
  easing: Easing.linear,
  useNativeDriver: true,
};

export const createWobbleAnimation = (translateX: Animated.Value, rotate: Animated.Value, duration: number) => {
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
