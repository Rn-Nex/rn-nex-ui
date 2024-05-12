import { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { GenerateOutlineStyles, GetLabelTransformStyleProps, GetTextInputStylesProps, TextFiledVariation } from './InputTypes';
import { INPUT_DEFAULT_HEIGHT, TRANSLATE_Y_ANIMATED_DEFAULT_POSITION } from './constants';

const outlineDefaultStyles: ViewStyle = {
  width: '100%',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: colors.white.dark,
  paddingHorizontal: 14,
  position: 'relative',
  backgroundColor: 'transparent',
};

const baseInputDefaultStyles: ViewStyle = {
  height: INPUT_DEFAULT_HEIGHT,
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const getInputOutlineVariationStyles = (variation: TextFiledVariation): StyleProp<ViewStyle> => {
  if (variation === 'outlined') return outlineDefaultStyles;
  else if (variation === 'filled')
    return {
      ...outlineDefaultStyles,
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: colors.disabled.light,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomWidth: 1,
    };
  else if (variation === 'standard')
    return {
      ...outlineDefaultStyles,
      borderWidth: 0,
      borderColor: 'transparent',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomWidth: 1,
    };
  return outlineDefaultStyles;
};

export const getTextInputStyles = ({ variant, endAdornment, startAdornment }: GetTextInputStylesProps): ViewStyle => {
  const adornmentStyles: ViewStyle = {
    width: '100%',
  };

  if (endAdornment || startAdornment) {
    adornmentStyles.width = '90%';
  }

  if (variant === 'outlined' || variant === 'filled') return { ...baseInputDefaultStyles, ...adornmentStyles };
  else if (variant === 'standard') return { ...baseInputDefaultStyles, ...adornmentStyles, marginBottom: -10 };
  return baseInputDefaultStyles;
};

export const getLabelTransformStyle = ({
  textHeight,
  labeled,
  variant,
  placeholderLeftPosition,
  textInputLayoutRect,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
}: GetLabelTransformStyleProps): StyleProp<ViewStyle> => {
  const getOutputRange = (variant?: TextFiledVariation) => {
    let outputRange: number[] = [];

    if (variant === 'filled' || variant === 'outlined') {
      outputRange = [-(textHeight / 2), translateYAnimatedPosition + -(textHeight / 2)];
    } else if (textInputLayoutRect) {
      outputRange = [-(textHeight / 2) + textInputLayoutRect.height / 2 - 20, translateYAnimatedPosition];
    } else {
      outputRange = [-(textHeight / 2) + INPUT_DEFAULT_HEIGHT / 2 - 20, translateYAnimatedPosition];
    }

    return outputRange;
  };

  return {
    position: 'absolute',
    zIndex: 10,
    left: placeholderLeftPosition || 0,
    backgroundColor: variant === 'outlined' ? colors.white.main : 'transparent',
    paddingHorizontal: 8,
    top: '50%',
    transform: [
      {
        translateY: labeled
          ? labeled.interpolate({
              inputRange: [0, 1],
              outputRange: getOutputRange(variant),
            })
          : 0,
      },
      {
        scale: labeled
          ? labeled.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.8],
            })
          : 1,
      },
    ],
  };
};

export const generateOutlineStyles = ({
  error,
  errorColor,
  isFocused,
  activeColor,
}: GenerateOutlineStyles): StyleProp<ViewStyle> => {
  let styles: ViewStyle = {
    borderColor: colors.white.dark,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  if (error) {
    styles = { ...styles, borderColor: errorColor ? errorColor : colors.error.light };
  } else if (isFocused) {
    styles = { ...styles, borderColor: activeColor ? activeColor : colors.blue.dark };
  }

  return styles;
};
