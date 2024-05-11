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
import { OutlinedTextFieldProps } from './InputTypes';

const LABELED_ANIMATION_DURATION = 120;
const INPUT_DEFAULT_HEIGHT = 58;

const baseInputDefaultStyles: ViewStyle = {
  width: '100%',
  height: INPUT_DEFAULT_HEIGHT,
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const OutlinedTextField = ({
  placeholder,
  outlineStyles,
  value,
  style,
  error,
  activeColor,
  onFocus: onTextInputFocusHandler,
  onBlur: onTextInputBlurHandler,
  onLayout: onTextInputLayoutHandler,
  ...props
}: OutlinedTextFieldProps) => {
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
    <Outline activeColor={activeColor} style={outlineStyles} isFocused={isFocused || !!value} error={error}>
      {outlineLayoutRectangle?.width && outlineLayoutRectangle?.height ? (
        <InputLabel
          activeColor={activeColor}
          placeholder={placeholder}
          labeled={inputLabeledAnimatedValue}
          translateYAnimatedPosition={-(outlineLayoutRectangle.height / 2)}
          error={error}
        />
      ) : null}
      <BaseInput onBlur={onBlur} onFocus={onFocus} onLayout={onLayout} style={[baseInputDefaultStyles, style]} {...props} />
    </Outline>
  );
};

OutlinedTextField.displayName = 'OutlinedTextField';
