import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { GetLabelTransformStyleProps, TextFiledVariation } from './InputTypes';
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
  width: '100%',
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

export const getTextInputStyles = (variation: TextFiledVariation): ViewStyle => {
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
    } else {
      outputRange = [-(textHeight / 2) + INPUT_DEFAULT_HEIGHT / 2 - 20, translateYAnimatedPosition + -(textHeight / 2)];
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
