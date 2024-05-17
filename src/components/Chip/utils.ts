import { ViewStyle, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { GenerateChipStylesProps } from './ChipTypes';
import { colors } from '../../libraries';
import { ADORNMENT_WRAPPER_SPACE } from './constants';

export const generateChipAdornmentStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    minWidth: ADORNMENT_WRAPPER_SPACE,
    minHeight: ADORNMENT_WRAPPER_SPACE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 100,
  };

  return styles;
};

export const generateChipElementWrapperStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  };

  return styles;
};

export const generateChipStyles = ({ variant, disabled, withAdornment, color }: GenerateChipStylesProps) => {
  let styles: ViewStyle = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  };

  if (variant === 'outlined') {
    styles = {
      ...styles,
      borderWidth: 1,
      borderColor: colors.silver.dark,
    };
  } else {
    styles = {
      ...styles,
      elevation: 5,
      shadowColor: Colors.black.light,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    };
  }

  if (disabled) {
    styles = { ...styles, opacity: 0.5 };
  }

  if (color === 'primary') {
    styles.backgroundColor = colors.primary.light;
  } else if (color === 'secondary') {
    styles.backgroundColor = colors.secondary.light;
  } else if (color === 'error') {
    styles.backgroundColor = colors.error.light;
  } else if (color === 'warning') {
    styles.backgroundColor = colors.yellow.dark;
  } else if (color === 'info') {
    styles.backgroundColor = colors.info.light;
  } else if (color === 'success') {
    styles.backgroundColor = colors.green.dark;
  } else {
    styles.backgroundColor = colors.gray.dark;
  }

  if (withAdornment) {
    styles = {
      ...styles,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    };
  }

  return styles;
};
