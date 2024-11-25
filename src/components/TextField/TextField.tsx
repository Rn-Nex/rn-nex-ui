import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { generateElementStyles } from '../../utils';
import { Box } from '../Box';
import { BaseInput } from './BaseInput';
import {
  LABELED_ANIMATION_DURATION,
  PLACEHOLDER_FILED_INPUT_LEFT_POSITION,
  PLACEHOLDER_OUTLINE_LEFT_POSITION,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import { TextFieldProps } from './Input.types';
import { InputLabel } from './InputLabel';
import { Outline } from './InputOutline';
import { textInputStyles as textInputStylesUtil } from './TextField.style';

export const TextField = React.forwardRef<View, TextFieldProps>(
  (
    {
      value,
      style,
      sx,
      error,
      activeColor,
      errorColor,
      inputLabelProps,
      animatedDuration,
      startAdornment,
      startAdornmentContainerProps,
      endAdornment,
      endAdornmentContainerProps,
      inputStyles,
      outlineContainerTestId,
      outlineProps,
      isFocused: inputIsFocused,
      onFocus: onTextInputFocusHandler,
      onBlur: onTextInputBlurHandler,
      onLayout: onTextInputLayoutHandler,
      hideLabel = false,
      square = false,
      editable = true,
      placeholder = 'Outlined',
      variant = 'outlined',
      ignoreOpacityOnNonEditable = false,
      ...props
    },
    ref,
  ) => {
    const inputLabelAnimatedValue = useRef(new Animated.Value(0)).current;
    const [textInputLayoutRectangle, setTextInputLayoutRectangle] = useState<LayoutRectangle>();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const placeHolderLeftPos = variant === 'filled' ? PLACEHOLDER_FILED_INPUT_LEFT_POSITION : PLACEHOLDER_OUTLINE_LEFT_POSITION;

    const onLayout = useCallback((event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;

      if (onTextInputLayoutHandler && typeof onTextInputLayoutHandler === 'function') {
        onTextInputLayoutHandler(event);
      }

      setTextInputLayoutRectangle(layout);
    }, []);

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

    const getLabelTranslatePos = useCallback(() => {
      if (textInputLayoutRectangle?.width && textInputLayoutRectangle?.height) {
        if (variant === 'outlined') return (textInputLayoutRectangle.height / 2) * -1;
        else if (variant === 'filled') return ((textInputLayoutRectangle.height - 19) / 2) * -1;
      }
      return TRANSLATE_Y_ANIMATED_DEFAULT_POSITION;
    }, [textInputLayoutRectangle]);

    const textInputStyles = useMemo(
      () => textInputStylesUtil({ variant, endAdornment: !!endAdornment, startAdornment: !!startAdornment }),
      [variant, endAdornment, startAdornment],
    );

    useEffect(() => {
      inputLabelAnimatedValue.stopAnimation();
      if (isFocused || value || !!startAdornment || inputIsFocused) {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 1,
          duration: animatedDuration ?? LABELED_ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(inputLabelAnimatedValue, {
          toValue: 0,
          duration: animatedDuration ?? LABELED_ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    }, [isFocused, inputIsFocused, value, startAdornment, endAdornment]);

    return (
      <Outline
        editable={editable}
        variant={variant}
        activeColor={activeColor}
        errorColor={errorColor}
        style={StyleSheet.flatten([sx && generateElementStyles(sx), style])}
        isFocused={isFocused}
        error={error}
        ignoreOpacityOnNonEditable={ignoreOpacityOnNonEditable}
        square={square}
        ref={ref}
        testID={outlineContainerTestId}
        {...outlineProps}>
        {!hideLabel && (
          <InputLabel
            disabled={!editable}
            variant={variant}
            isActive={isFocused}
            activeColor={activeColor}
            errorColor={errorColor}
            placeholder={placeholder}
            labelAnimatedValue={inputLabelAnimatedValue}
            translateYAnimatedPosition={getLabelTranslatePos()}
            placeholderLeftPosition={placeHolderLeftPos}
            error={error}
            ignoreOpacityOnNonEditable={ignoreOpacityOnNonEditable}
            {...inputLabelProps}
          />
        )}
        {startAdornment && (
          <Box style={{ marginRight: 8 }} {...startAdornmentContainerProps}>
            {startAdornment}
          </Box>
        )}
        <BaseInput
          value={value}
          editable={editable}
          onBlur={onBlur}
          onFocus={onFocus}
          onLayout={onLayout}
          style={StyleSheet.flatten([textInputStyles, inputStyles])}
          variant={variant}
          placeholder={hideLabel ? placeholder : undefined}
          {...props}
        />
        {endAdornment && (
          <Box style={{ marginLeft: 8 }} {...endAdornmentContainerProps}>
            {endAdornment}
          </Box>
        )}
      </Outline>
    );
  },
);

TextField.displayName = 'TextField';
