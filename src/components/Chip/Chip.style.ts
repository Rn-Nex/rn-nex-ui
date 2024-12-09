import { ColorValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { grey } from '../../libraries';
import { getVariant } from '../../utils';
import { GenerateChipStylesProps, LabelStylesInterface } from './Chip.types';
import { ADORNMENT_WRAPPER_SPACE } from './constants';

export const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
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

export const generateChipStyles = ({ variant, disabled, color, colors, colorSchemeConfig }: GenerateChipStylesProps) => {
  let baseStyles: ViewStyle = {};

  if (disabled) {
    baseStyles = { ...baseStyles, opacity: 0.5 };
  }

  if (variant === 'outlined') {
    baseStyles = {
      ...baseStyles,
      borderWidth: 1,
      borderColor: getVariant({ variant: color, colors, config: colorSchemeConfig }),
    };
  } else {
    baseStyles.backgroundColor = getVariant({ variant: color, colors, config: colorSchemeConfig });
  }

  return baseStyles;
};

export const labelStyles = ({
  isOutlinedVariant,
  labelColor,
  color,
  colors,
  syncBorderAndLabelColor,
  colorSchemeConfig,
}: LabelStylesInterface): TextStyle => {
  let textColor: ColorValue;

  switch (color) {
    case 'secondary':
    case 'error':
    case 'success':
    case 'info':
      textColor = grey[50];
      break;
    default:
      textColor = colors.grey[50];
  }

  let resolvedColor;

  if (syncBorderAndLabelColor) {
    resolvedColor = getVariant({ variant: color, colors, config: colorSchemeConfig });
  } else if (labelColor) {
    resolvedColor = labelColor;
  } else {
    resolvedColor = isOutlinedVariant ? colors.grey[900] : textColor;
  }

  return {
    color: resolvedColor,
  };
};
