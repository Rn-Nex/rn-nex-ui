import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
} from 'react-native';
import { BaseInput } from './BaseInput';
import { InputLabel } from './InputLabel';
import { Outline } from './InputOutline';
import { TextFieldProps } from './InputTypes';
import { INPUT_DEFAULT_HEIGHT, LABELED_ANIMATION_DURATION } from './constants';

const baseInputDefaultStyles: ViewStyle = {
  width: '100%',
  height: INPUT_DEFAULT_HEIGHT,
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const TextField = ({
  placeholder,
  outlineStyles,
  value,
  style,
  error,
  activeColor,
  errorColor,
  inputLabelProps,
  onFocus: onTextInputFocusHandler,
  onBlur: onTextInputBlurHandler,
  onLayout: onTextInputLayoutHandler,
  ...props
}: TextFieldProps) => {
  const inputLabeledAnimatedValue = useRef(new Animated.Value(0)).current;
  const [outlineLayoutRectangle, setOutlineLayoutRectangle] = useState<LayoutRectangle>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;

    if (onTextInputLayoutHandler && typeof onTextInputLayoutHandler === 'function') {
      onTextInputLayoutHandler(event);
    }

    setOutlineLayoutRectangle(layout);
  };

  const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onTextInputFocusHandler && typeof onTextInputFocusHandler === 'function') {
      onTextInputFocusHandler(event);
    }
    setIsFocused(true);
  };

  const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onTextInputBlurHandler && typeof onTextInputBlurHandler === 'function') {
      onTextInputBlurHandler(event);
    }
    setIsFocused(false);
  };

  useEffect(() => {
    inputLabeledAnimatedValue.stopAnimation();
    if (isFocused || value) {
      Animated.timing(inputLabeledAnimatedValue, {
        toValue: 1,
        duration: LABELED_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(inputLabeledAnimatedValue, {
        toValue: 0,
        duration: LABELED_ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  return (
    <Outline activeColor={activeColor} errorColor={errorColor} style={outlineStyles} isFocused={isFocused} error={error}>
      {outlineLayoutRectangle?.width && outlineLayoutRectangle?.height ? (
        <InputLabel
          isActive={isFocused}
          activeColor={activeColor}
          errorColor={errorColor}
          placeholder={placeholder}
          labeled={inputLabeledAnimatedValue}
          translateYAnimatedPosition={-(outlineLayoutRectangle.height / 2)}
          error={error}
          {...inputLabelProps}
        />
      ) : null}
      <BaseInput onBlur={onBlur} onFocus={onFocus} onLayout={onLayout} style={[baseInputDefaultStyles, style]} {...props} />
    </Outline>
  );
};

TextField.displayName = 'TextField';
