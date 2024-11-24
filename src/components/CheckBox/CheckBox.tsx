import React, { useCallback } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '../../libraries';
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
    const { theme } = useTheme();
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

      let tintColor: string;

      if (checkBoxColor) tintColor = checkBoxColor;
      else if (isChecked) tintColor = getVariant({ variant, theme });
      else tintColor = theme.colors.grey[600];

      return <Image source={source} style={StyleSheet.flatten([{ tintColor }, sizeStyles])} testID={checkBoxImageTestId} />;
    }, [isChecked, variant, theme, checkBoxColor, size, checkBoxImageTestId]);

    const elementOnPressHandler = (event: GestureResponderEvent) => {
      if (onPress && typeof onPress === 'function' && actionType === 'root') {
        onPress(event);
      }
    };

    const renderAdornment = useCallback(() => {
      let element: React.ReactNode;
      if (hasAdornment) element = adornment;
      else {
        element = (
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
      }

      const elementContainerStyles = hasAdornment ? adornmentContainerStyles : labelContainerStyles;

      return (
        <View style={StyleSheet.flatten([styles.adornmentContainer, elementContainerStyles])}>
          <Pressable disabled={disabled} onPress={elementOnPressHandler} testID={adornmentTestId}>
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
      adornmentTestId,
    ]);

    const renderImage = useCallback(() => {
      if (isChecked) {
        return checkedImage ?? displayCheckedImage();
      }

      return unCheckedImage ?? displayCheckedImage();
    }, [isChecked, variant, theme, checkBoxColor, size]);

    return (
      <View ref={ref} style={StyleSheet.flatten([styles.container, style, { opacity: disabled ? 0.5 : 1 }])} {...containerProps}>
        {shouldRenderAdornment && renderAdornment()}
        <View style={StyleSheet.flatten([styles.checkboxContainer, checkBoxWrapperStyles])}>
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
