import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { OutlineStyles, LabelTransformStyleProps, TextInputStylesProps, TextFiledVariation } from './InputTypes';
import { INPUT_DEFAULT_BORDER_WIDTH, INPUT_DEFAULT_HEIGHT, TRANSLATE_Y_ANIMATED_DEFAULT_POSITION } from './constants';
import { ThemeType } from '../../libraries/themes/v1/theme';

const baseInputDefaultStyles: ViewStyle = {
  height: INPUT_DEFAULT_HEIGHT,
  position: 'relative',
  zIndex: 12,
  backgroundColor: 'transparent',
};

export const inputOutlineVariationStyles = (variation: TextFiledVariation, theme: ThemeType): StyleProp<ViewStyle> => {
  const outlineDefaultStyles: ViewStyle = {
    width: '100%',
    borderRadius: 6,
    borderWidth: INPUT_DEFAULT_BORDER_WIDTH,
    borderColor: theme.colors.grey[500],
    paddingHorizontal: 14,
    position: 'relative',
    backgroundColor: 'transparent',
  };

  if (variation === 'outlined') return outlineDefaultStyles;
  else if (variation === 'filled')
    return {
      ...outlineDefaultStyles,
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: theme.colors.grey[600],
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomWidth: INPUT_DEFAULT_BORDER_WIDTH,
    };
  else if (variation === 'standard')
    return {
      ...outlineDefaultStyles,
      borderWidth: 0,
      borderColor: 'transparent',
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderBottomWidth: INPUT_DEFAULT_BORDER_WIDTH,
    };
  return outlineDefaultStyles;
};

export const textInputStyles = ({ variant, endAdornment, startAdornment }: TextInputStylesProps): StyleProp<ViewStyle> => {
  const adornmentStyles: StyleProp<ViewStyle> = {
    width: '100%',
  };

  if (endAdornment || startAdornment) {
    adornmentStyles.width = '90%';
  }

  if (variant === 'outlined' || variant === 'filled') return { ...baseInputDefaultStyles, ...adornmentStyles };
  else if (variant === 'standard') return { ...baseInputDefaultStyles, ...adornmentStyles, marginBottom: -10 };
  return baseInputDefaultStyles;
};

export const labelTransformStyle = ({
  theme,
  textHeight,
  labeled,
  variant,
  placeholderLeftPosition,
  textInputLayoutRect,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
}: LabelTransformStyleProps): StyleProp<ViewStyle> => {
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
    backgroundColor: theme.colors.white[50],
    left: placeholderLeftPosition || 0,
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

export const outlineStyles = ({ error, errorColor, isFocused, activeColor, theme }: OutlineStyles): StyleProp<ViewStyle> => {
  let styles: ViewStyle = {
    borderColor: theme.colors.grey[600],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  if (error) {
    styles = { ...styles, borderColor: errorColor ? errorColor : theme.colors.red[500] };
  } else if (isFocused) {
    styles = { ...styles, borderColor: activeColor ? activeColor : theme.colors.lightBlue[500] };
  }

  return styles;
};

export const labelTextStyles = (theme: ThemeType): TextStyle => {
  const baseStyles: TextStyle = {
    color: theme.colors.grey[800],
  };
  return baseStyles;
};

export const baseInputStyles = (theme: ThemeType): TextStyle => {
  const baseStyles: TextStyle = {
    color: theme.colors.grey[200],
  };
  return baseStyles;
};
