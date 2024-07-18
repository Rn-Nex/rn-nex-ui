import React, { useCallback, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, LayoutChangeEvent, LayoutRectangle, TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { AnimatedView } from '../Box';
import { Ripple } from '../Ripple';
import { RippleInterface } from '../Ripple/RippleTypes';
import { BaseButtonProps } from './ButtonTypes';

export const BaseButton = React.forwardRef<TouchableWithoutFeedback, BaseButtonProps>(
  (
    {
      disableRipple,
      disabled,
      children,
      rippleProps,
      rippleEdge,
      style,
      sx,
      scaleAnimationValue = 0.99,
      disableScaleAnimation = false,
      onLayout: onLayoutHandler,
      onPress: onPressHandler,
      onLongPress: onLongPressHandler,
      ...props
    },
    ref,
  ) => {
    const rippleRef = useRef<RippleInterface>(null);
    const [buttonLayoutRectangle, setButtonLayoutRectangle] = useState<LayoutRectangle>();
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: scaleAnimationValue,
        useNativeDriver: true,
      }).start(handlePressOut);
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const buttonPressHandler = (event: GestureResponderEvent) => {
      if (onPressHandler && typeof onPressHandler === 'function' && !disabled) {
        if (!disableScaleAnimation) {
          handlePressIn();
        }
        const { locationX, locationY } = event.nativeEvent;
        if (rippleRef.current && buttonLayoutRectangle) {
          if (rippleEdge) {
            rippleRef.current?.createRippleFromPosition(rippleEdge, buttonLayoutRectangle);
          } else {
            rippleRef.current.startRipple(locationX, locationY);
          }
        }
        onPressHandler(event);
      }
    };

    const buttonLongPressHandler = (event: GestureResponderEvent) => {
      if (onLongPressHandler && typeof onLongPressHandler === 'function' && !disabled) {
        const { locationX, locationY } = event.nativeEvent;
        if (rippleRef.current && buttonLayoutRectangle) {
          if (rippleEdge) {
            rippleRef.current?.createRippleFromPosition(rippleEdge, buttonLayoutRectangle);
          } else {
            rippleRef.current.startRipple(locationX, locationY);
          }
        }
      }
    };

    const buttonLayoutHandler = useCallback(
      (event: LayoutChangeEvent) => {
        const { layout } = event.nativeEvent;
        setButtonLayoutRectangle(layout);
        if (onLayoutHandler && typeof onLayoutHandler === 'function') onLayoutHandler(event);
      },
      [onLayoutHandler],
    );

    return (
      <TouchableWithoutFeedback
        ref={ref}
        onPress={buttonPressHandler}
        onLongPress={buttonLongPressHandler}
        onLayout={buttonLayoutHandler}
        {...props}>
        <AnimatedView
          pointerEvents="box-only"
          style={[sx && generateElementStyles(sx), { transform: [{ scale: scaleValue }] }, style]}>
          {children}
          {disableRipple ? null : <Ripple ref={rippleRef} {...rippleProps} />}
        </AnimatedView>
      </TouchableWithoutFeedback>
    );
  },
);
