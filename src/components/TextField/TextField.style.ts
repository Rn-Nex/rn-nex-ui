import { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import {
  INPUT_DEFAULT_BORDER_RADIUS,
  INPUT_DEFAULT_BORDER_WIDTH,
  INPUT_DEFAULT_HEIGHT,
  TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
} from './constants';
import {
  BaseInputStylesProps,
  LabelTextStylesProps,
  LabelTransformStyleProps,
  OutlineStyles,
  TextFiledVariation,
  TextInputStylesProps,
} from './Input.types';

const baseInputDefaultStyles: ViewStyle = {
  height: INPUT_DEFAULT_HEIGHT,
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const textInputStyles = ({ variant, endAdornment, startAdornment }: TextInputStylesProps): StyleProp<ViewStyle> => {
  const adornmentStyles: StyleProp<ViewStyle> = {
    flex: 1,
  };

  if (endAdornment || startAdornment) {
    adornmentStyles.width = '90%';
  }

  if (variant === 'outlined' || variant === 'filled') return { ...baseInputDefaultStyles, ...adornmentStyles };
  else if (variant === 'standard') return { ...baseInputDefaultStyles, ...adornmentStyles, marginBottom: -10 };
  return baseInputDefaultStyles;
};

export const labelTextStyles = ({ theme, variant, ignoreOpacityOnNonEditable }: LabelTextStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variant === 'outlined' ? theme.colors.grey[800] : theme.colors.white[50],
  };

  if (ignoreOpacityOnNonEditable) baseStyles.opacity = 1;

  return baseStyles;
};

export const baseInputStyles = ({ theme, variant }: BaseInputStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variant === 'outlined' ? theme.colors.grey[800] : theme.colors.grey[200],
    minHeight: 30,
    width: '100%',
  };
  return baseStyles;
};

export const outlineStyles = ({
  error,
  errorColor,
  isFocused,
  activeColor,
  theme,
  editable,
  variant,
  ignoreOpacityOnNonEditable,
  square,
}: OutlineStyles): ViewStyle => {
  const baseStyles: ViewStyle = {
    borderWidth: variant === 'outlined' ? 0.6 : 0,
    borderColor: theme.colors.grey[400],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    opacity: editable || ignoreOpacityOnNonEditable ? 1 : 0.6,
    borderRadius: square ? 0 : INPUT_DEFAULT_BORDER_RADIUS,
  };

  let borderColor: ColorValue;

  if (error) {
    borderColor = errorColor ?? theme.colors.red[500];
  } else if (isFocused) {
    borderColor = activeColor ?? theme.colors.lightBlue[500];
  } else {
    borderColor = theme.colors.grey[400];
  }

  return { ...baseStyles, borderColor };
};

export const inputOutlineVariationStyles = (variation: TextFiledVariation, theme: ThemeType): ViewStyle => {
  const outlineDefaultStyles: ViewStyle = {
    width: '100%',
    borderRadius: 6,
    borderWidth: INPUT_DEFAULT_BORDER_WIDTH,
    borderColor: theme.colors.grey[500],
    paddingHorizontal: 14,
    position: 'relative',
    backgroundColor: 'transparent',
  };

  switch (variation) {
    case 'outlined':
      return outlineDefaultStyles;
    case 'filled':
      return {
        ...outlineDefaultStyles,
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: theme.colors.grey[500],
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomWidth: INPUT_DEFAULT_BORDER_WIDTH,
      };
  }
};

export const labelTransformStyle = ({
  theme,
  textHeight,
  labelAnimatedValue,
  variant,
  placeholderLeftPosition,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
}: LabelTransformStyleProps): StyleProp<ViewStyle> => {
  const isOutlinedVariant = variant === 'outlined';

  const getOutputRange = () => {
    let outputRange = [-(textHeight / 2), translateYAnimatedPosition + -(textHeight / 2)];
    return outputRange;
  };

  const transform: ViewStyle['transform'] = [
    {
      translateY: labelAnimatedValue ? labelAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: getOutputRange() }) : 0,
    },
    {
      scale: labelAnimatedValue ? labelAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }) : 1,
    },
  ];

  return {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: isOutlinedVariant ? theme.colors.white[50] : 'transparent',
    left: placeholderLeftPosition ?? 0,
    paddingHorizontal: 8,
    top: '50%',
    transform,
  };
};
