import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '../../libraries';
import { getVariant } from '../../utils';
import { Box } from '../Box';
import { CheckBoxProps } from './CheckBox.types';

const defaultIndeterminateImage = require('./check-box/indeterminate_check_box.png');
const defaultCheckBoxImage = require('./check-box/check_box.png');
const defaultCheckBoxOutlineImage = require('./check-box/check_box_outline_blank.png');

export const CheckBox = React.forwardRef<View, CheckBoxProps>(
  (
    {
      checkedImage,
      unCheckedImage,
      indeterminateImage,
      style,
      checkBoxWrapperStyles,
      startAdornment,
      startAdornmentContainerProps,
      endAdornment,
      endAdornmentContainerProps,
      variant,
      checkBoxColor,
      containerProps,
      isChecked = false,
      isIndeterminate = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const displayCheckedImage = useCallback(() => {
      let source;
      if (isIndeterminate) {
        source = defaultIndeterminateImage;
      } else {
        source = isChecked ? defaultCheckBoxImage : defaultCheckBoxOutlineImage;
      }
      return (
        <Image
          source={source}
          style={{ tintColor: checkBoxColor || isChecked ? getVariant({ variant, theme }) : theme.colors.grey[600] }}
        />
      );
    }, [isChecked, isIndeterminate, variant, theme, checkBoxColor]);

    const renderImage = useCallback(() => {
      if (isIndeterminate) {
        return indeterminateImage ? indeterminateImage : displayCheckedImage();
      }
      if (isChecked) {
        return checkedImage ? checkedImage : displayCheckedImage();
      } else {
        return unCheckedImage ? unCheckedImage : displayCheckedImage();
      }
    }, [isChecked, isIndeterminate, variant, theme, checkBoxColor]);

    return (
      <View ref={ref} {...containerProps}>
        <TouchableWithoutFeedback disabled={disabled} {...props}>
          <View style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}>
            {startAdornment && (
              <Box style={{ marginRight: 8 }} {...startAdornmentContainerProps}>
                {startAdornment}
              </Box>
            )}
            <View style={[checkBoxWrapperStyles]}>{renderImage()}</View>
            {endAdornment && (
              <Box style={{ marginLeft: 8 }} {...endAdornmentContainerProps}>
                {endAdornment}
              </Box>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
