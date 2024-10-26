import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { ChipVariations, GenerateChipStylesProps } from './Chip.types';
import { ADORNMENT_WRAPPER_SPACE } from './constants';

export const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  chipWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  chipInnerComponentWrapper: {
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
      return theme.colors.grey[700];
  }
};

export const generateChipStyles = ({ variant, disabled, withAdornment, color, theme }: GenerateChipStylesProps) => {
  let styles: ViewStyle = {};

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
