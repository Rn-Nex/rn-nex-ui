import { StyleSheet, ViewStyle } from 'react-native';
import { ChipVariations, GenerateChipStylesProps } from './Chip.types';
import { ADORNMENT_WRAPPER_SPACE, CHIP_CLASSNAMES } from './constants';
import { ThemeType } from '../../libraries/themes/v1/theme';

export const styles = StyleSheet.create({
  [CHIP_CLASSNAMES.RN_NIX_CHIP_ELEMENT_WRAPPER_CLASS]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  [CHIP_CLASSNAMES.RN_NIX_CHIP_ADORNMENT_CLASS]: {
    minWidth: ADORNMENT_WRAPPER_SPACE,
    minHeight: ADORNMENT_WRAPPER_SPACE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 100,
  },
});

export const getColorVariant = (theme: ThemeType, variant: ChipVariations | undefined) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary[500];
    case 'secondary':
      return theme.colors.secondary[500];
    case 'error':
      return theme.colors.red[500];
    case 'warning':
      return theme.colors.yellow[400];
    case 'info':
      return theme.colors.lightBlue[500];
    case 'success':
      return theme.colors.green[500];
    default:
      return theme.colors.grey[400];
  }
};

export const generateChipStyles = ({ variant, disabled, withAdornment, color, theme }: GenerateChipStylesProps) => {
  let styles: ViewStyle = {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  };

  if (disabled) {
    styles = { ...styles, opacity: 0.5 };
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

  if (variant === 'outlined') {
    styles = {
      ...styles,
      borderWidth: 1,
      borderColor: getColorVariant(theme, color),
    };
  } else {
    styles.backgroundColor = getColorVariant(theme, color);
  }

  return styles;
};
