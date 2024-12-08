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
    alignSelf: 'auto',
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

export const generateChipStyles = ({ variant, disabled, color, colors }: GenerateChipStylesProps) => {
  let styles: ViewStyle = {};

  if (disabled) {
    styles = { ...styles, opacity: 0.5 };
  }

  if (variant === 'outlined') {
    styles = {
      ...styles,
      borderWidth: 1,
      borderColor: getVariant({ variant: color, colors }),
    };
  } else {
    styles.backgroundColor = getVariant({ variant: color, colors });
  }

  return styles;
};

export const labelStyles = ({
  isOutlinedVariant,
  labelColor,
  color,
  colors,
  syncBorderAndLabelColor,
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
    resolvedColor = getVariant({ variant: color, colors });
  } else if (labelColor) {
    resolvedColor = labelColor;
  } else {
    resolvedColor = isOutlinedVariant ? colors.grey[900] : textColor;
  }

  return {
    color: resolvedColor,
  };
};
