import React, { useCallback } from 'react';
import { GestureResponderEvent, Image, ImageStyle, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../libraries';
import { getVariant } from '../../utils';
import { Text } from '../Typography';
import { CheckBoxProps } from './CheckBox.types';

const checkBoxSmall = require('./images/check-box-small.png');
const checkBoxOutlineSmall = require('./images/check-box-outline-small.png');
const checkBoxMedium = require('./images/check-box-medium.png');
const checkBoxOutlineMedium = require('./images/check-box-outline-medium.png');

const CHECKBOX_SMALL_SIZE = 20;
const CHECKBOX_MEDIUM_SIZE = 30;

export const CheckBox = React.forwardRef<View, CheckBoxProps>(
  (
    {
      checkedImage,
      unCheckedImage,
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
      actionType = 'root',
      fullWidth = false,
      adornmentType = 'end',
      size = 'medium',
      isChecked = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const hasAdornment = Boolean(adornment);

    const displayCheckedImage = useCallback(() => {
      const isSmallCheckBox = size === 'small';
      let source = isChecked
        ? isSmallCheckBox
          ? checkBoxSmall
          : checkBoxMedium
        : isSmallCheckBox
          ? checkBoxOutlineSmall
          : checkBoxOutlineMedium;

      const sizeStyles: ImageStyle = {
        width: isSmallCheckBox ? CHECKBOX_SMALL_SIZE : CHECKBOX_MEDIUM_SIZE,
        height: isSmallCheckBox ? CHECKBOX_SMALL_SIZE : CHECKBOX_MEDIUM_SIZE,
      };

      return (
        <Image
          source={source}
          style={StyleSheet.flatten([
            { tintColor: checkBoxColor || isChecked ? getVariant({ variant, theme }) : theme.colors.grey[600] },
            sizeStyles,
          ])}
        />
      );
    }, [isChecked, variant, theme, checkBoxColor, size]);

    const elementOnPressHandler = (event: GestureResponderEvent) => {
      if (onPress && typeof onPress === 'function' && actionType === 'root') {
        onPress(event);
      }
    };

    const renderAdornment = useCallback(() => {
      const element = hasAdornment ? (
        adornment
      ) : (
        <React.Fragment>
          <Text variation="h4" style={labelStyles}>
            {label}
          </Text>
          {subLabel && (
            <Text variation="h5" style={subLabelStyles}>
              {subLabel}
            </Text>
          )}
        </React.Fragment>
      );
      const elementContainerStyles = hasAdornment ? adornmentContainerStyles : labelContainerStyles;

      return (
        <View style={StyleSheet.flatten([styles.adornmentContainer, elementContainerStyles])}>
          <Pressable disabled={disabled} onPress={elementOnPressHandler}>
            {element}
          </Pressable>
        </View>
      );
    }, [
      adornment,
      adornmentContainerStyles,
      label,
      labelContainerStyles,
      actionType,
      disabled,
      onPress,
      isChecked,
      subLabel,
      labelStyles,
      subLabelStyles,
    ]);

    const renderImage = useCallback(() => {
      if (isChecked) {
        return checkedImage ? checkedImage : displayCheckedImage();
      } else {
        return unCheckedImage ? unCheckedImage : displayCheckedImage();
      }
    }, [isChecked, variant, theme, checkBoxColor, size]);

    return (
      <View ref={ref} style={StyleSheet.flatten([styles.container, style, { opacity: disabled ? 0.5 : 1 }])} {...containerProps}>
        {adornmentType === 'start' && (hasAdornment || label) && renderAdornment()}
        <View style={StyleSheet.flatten([styles.checkboxContainer, checkBoxWrapperStyles])}>
          <TouchableWithoutFeedback disabled={disabled} onPress={onPress} {...props}>
            {renderImage()}
          </TouchableWithoutFeedback>
        </View>
        {adornmentType === 'end' && (hasAdornment || label) && renderAdornment()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
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
