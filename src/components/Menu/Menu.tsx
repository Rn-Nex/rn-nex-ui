import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { AnimatedView } from '../Box';
import { Portal } from '../Portal';
import { MenuProps } from './MenuTypes';
import { FADE_ANIMATION_DURATION, SCALE_ANIMATION_DURATION } from './constants';
import { dialogContainerStyles, menuStyles } from './Menu.style';

export const Menu: React.FC<MenuProps> = ({
  rootElementRect,
  modalContainerProps,
  menuContainerStyles,
  visible,
  children,
  focused,
  fadeAnimationDuration = FADE_ANIMATION_DURATION,
  scaleAnimationDuration = SCALE_ANIMATION_DURATION,
  ...props
}) => {
  const [animatedRect, setAnimatedRect] = useState<LayoutRectangle>();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  const animatedViewOnLayoutHandler = (event: LayoutChangeEvent) => {
    setAnimatedRect(event.nativeEvent.layout);
  };

  const dialogContainer = useMemo(
    () => dialogContainerStyles({ rootElementRect, wrapperComponentRect: animatedRect }),
    [rootElementRect, animatedRect],
  );

  useEffect(() => {
    if (visible || focused) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: fadeAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: fadeAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration: scaleAnimationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, focused]);

  return (
    <Portal
      animationType="none"
      visible={visible || focused}
      modalContainerProps={{ ...modalContainerProps, style: [menuStyles(), modalContainerProps?.style] }}
      {...props}>
      <AnimatedView
        onLayout={animatedViewOnLayoutHandler}
        style={[
          dialogContainer,
          {
            opacity,
            transform: [{ scale }],
          },
          menuContainerStyles,
        ]}>
        {children}
      </AnimatedView>
    </Portal>
  );
};
