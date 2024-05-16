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

export const generateChipStyles = ({ variant, disabled }: GenerateChipStylesProps) => {
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
      backgroundColor: colors.gray.dark,
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

  return styles;
};
