import React, { useCallback } from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useThemeCheckBoxConfigSelector, useThemeColorsSelector } from '../../libraries';
import { getVariant } from '../../utils';
import { Text } from '../Typography';
import { CheckBoxProps } from './CheckBox.types';

const checkBoxSmall = require('./images/check-box-small.png');
const checkBoxOutlineSmall = require('./images/check-box-outline-small.png');
const checkBoxMedium = require('./images/check-box-medium.png');
const checkBoxOutlineMedium = require('./images/check-box-outline-medium.png');

export const CHECKBOX_SMALL_SIZE = 20;
export const CHECKBOX_MEDIUM_SIZE = 30;

export const CheckBox = React.forwardRef<View, CheckBoxProps>(
  (
    {
      style,
      checkBoxWrapperStyles,
      adornment,
      adornmentContainerStyles,
      variant,
      checkBoxColor,
      containerProps,
      label,
      labelContainerStyles,
      onPress,
      subLabel,
      labelStyles,
      subLabelStyles,
      checkBoxImageTestId,
      adornmentTestId,
      actionType = 'root',
      adornmentType = 'end',
      size = 'medium',
      isChecked = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const checkBoxThemeConfig = useThemeCheckBoxConfigSelector();

    const {
      checkBoxColor: themeCheckBoxColor = checkBoxColor,
      checkBoxWrapperStyles: themeCheckBoxWrapperStyles = checkBoxWrapperStyles,
      adornmentContainerStyles: themeAdornmentContainerStyles = adornmentContainerStyles,
      labelStyles: themeLabelStyles = labelStyles,
      subLabelStyles: themeSubLabelStyles = subLabelStyles,
      labelContainerStyles: themeLabelContainerStyles = labelContainerStyles,
      actionType: themeActionType = actionType,
      colors: themeVariantColors,
    } = checkBoxThemeConfig || {};

    const hasAdornment = Boolean(adornment);
    const shouldRenderAdornment = adornmentType === 'start' && (hasAdornment || label || subLabel);
    const shouldRenderEndAdornment = adornmentType === 'end' && (hasAdornment || label || subLabel);

    const displayCheckedImage = useCallback(() => {
      const isSmallCheckBox = size === 'small';
      let source: ImageSourcePropType;

      if (isChecked) {
        source = isSmallCheckBox ? checkBoxSmall : checkBoxMedium;
      } else {
        source = isSmallCheckBox ? checkBoxOutlineSmall : checkBoxOutlineMedium;
      }

      const sizeStyles: ImageStyle = {
        width: isSmallCheckBox ? CHECKBOX_SMALL_SIZE : CHECKBOX_MEDIUM_SIZE,
        height: isSmallCheckBox ? CHECKBOX_SMALL_SIZE : CHECKBOX_MEDIUM_SIZE,
      };

      let tintColor: ColorValue;

      if (themeCheckBoxColor && isChecked) tintColor = themeCheckBoxColor;
      else if (isChecked) tintColor = getVariant({ variant, colors: themeColors, config: themeVariantColors });
      else tintColor = themeColors.grey[600];

      return <Image source={source} style={StyleSheet.flatten([{ tintColor }, sizeStyles])} testID={checkBoxImageTestId} />;
    }, [isChecked, variant, themeVariantColors, themeColors, themeCheckBoxColor, size, checkBoxImageTestId]);

    const elementOnPressHandler = (event: GestureResponderEvent) => {
      if (onPress && typeof onPress === 'function' && themeActionType === 'root') {
        onPress(event);
      }
    };

    const renderAdornment = useCallback(() => {
      let element: React.ReactNode;
      if (hasAdornment) element = adornment;
      else {
        element = (
          <React.Fragment>
            <Text variation="h4" style={themeLabelStyles}>
              {label}
            </Text>
            {subLabel && (
              <Text variation="h5" style={themeSubLabelStyles}>
                {subLabel}
              </Text>
            )}
          </React.Fragment>
        );
      }

      const elementContainerStyles = hasAdornment ? themeAdornmentContainerStyles : themeLabelContainerStyles;

      return (
        <View style={StyleSheet.flatten([styles.adornmentContainer, elementContainerStyles])}>
          <Pressable disabled={disabled} onPress={elementOnPressHandler} testID={adornmentTestId}>
            {element}
          </Pressable>
        </View>
      );
    }, [
      adornment,
      themeAdornmentContainerStyles,
      label,
      themeLabelContainerStyles,
      themeActionType,
      disabled,
      onPress,
      isChecked,
      subLabel,
      themeLabelStyles,
      themeSubLabelStyles,
      adornmentTestId,
    ]);

    const renderImage = useCallback(() => {
      if (isChecked) {
        return displayCheckedImage();
      }

      return displayCheckedImage();
    }, [isChecked, variant, themeColors, themeCheckBoxColor, size]);

    return (
      <View ref={ref} style={StyleSheet.flatten([styles.container, style, { opacity: disabled ? 0.5 : 1 }])} {...containerProps}>
        {shouldRenderAdornment && renderAdornment()}
        <View style={StyleSheet.flatten([styles.checkboxContainer, themeCheckBoxWrapperStyles])}>
          <TouchableWithoutFeedback disabled={disabled} onPress={onPress} {...props}>
            {renderImage()}
          </TouchableWithoutFeedback>
        </View>
        {shouldRenderEndAdornment && renderAdornment()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  adornmentContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});
