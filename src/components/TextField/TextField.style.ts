import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { INPUT_DEFAULT_BORDER_WIDTH, INPUT_DEFAULT_HEIGHT, TRANSLATE_Y_ANIMATED_DEFAULT_POSITION } from './constants';
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
    width: '100%',
  };

  if (endAdornment || startAdornment) {
    adornmentStyles.width = '90%';
  }

  if (variant === 'outlined' || variant === 'filled') return { ...baseInputDefaultStyles, ...adornmentStyles };
  else if (variant === 'standard') return { ...baseInputDefaultStyles, ...adornmentStyles, marginBottom: -10 };
  return baseInputDefaultStyles;
};

export const labelTextStyles = ({ theme, variant }: LabelTextStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variant === 'outlined' ? theme.colors.grey[800] : theme.colors.white[50],
  };
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
}: OutlineStyles): StyleProp<ViewStyle> => {
  let styles: ViewStyle = {
    borderWidth: variant === 'outlined' ? 0.6 : 0,
    borderColor: theme.colors.grey[400],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  if (error) {
    styles = { ...styles, borderColor: errorColor ? errorColor : theme.colors.red[500] };
  } else if (isFocused) {
    styles = { ...styles, borderColor: activeColor ? activeColor : theme.colors.lightBlue[500] };
  }

  if (!editable) {
    styles = { ...styles, opacity: 0.6 };
  }

  return styles;
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
      backgroundColor: theme.colors.grey[500],
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

export const labelTransformStyle = ({
  theme,
  textHeight,
  labeled,
  variant,
  placeholderLeftPosition,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
}: LabelTransformStyleProps): StyleProp<ViewStyle> => {
  const getOutputRange = () => {
    let outputRange = [-(textHeight / 2), translateYAnimatedPosition + -(textHeight / 2)];
    return outputRange;
  };

  return {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: variant === 'outlined' ? theme.colors.white[50] : 'transparent',
    left: placeholderLeftPosition || 0,
    paddingHorizontal: 8,
    top: '50%',
    transform: [
      {
        translateY: labeled
          ? labeled.interpolate({
              inputRange: [0, 1],
              outputRange: getOutputRange(),
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
