import { useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Text } from '../Typography';
import { InputLabelProps } from './Input.types';
import { labelTextStyles, labelTransformStyle } from './TextField.style';
import { PLACEHOLDER_OUTLINE_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT } from './constants';

export const InputLabel: React.FC<InputLabelProps> = function ({
  placeholder,
  labelAnimatedValue,
  editable,
  translateYAnimatedPosition,
  placeholderLeftPosition,
  labelContainerStyles,
  style,
  ignoreOpacityOnNonEditable,
  variant = 'outlined',
  ...props
}) {
  const themeColors = useThemeColorsSelector();

  const [textLayoutRect, setTextLayoutRect] = useState<LayoutRectangle>();
  const textHeight = textLayoutRect?.height ? textLayoutRect.height : TEXT_FONT_DEFAULT_HEIGHT;

  const styles = useMemo(
    () =>
      labelTransformStyle({
        colors: themeColors,
        textHeight,
        translateYAnimatedPosition,
        labelAnimatedValue,
        variant,
        placeholderLeftPosition: placeholderLeftPosition ?? PLACEHOLDER_OUTLINE_LEFT_POSITION,
      }),
    [themeColors, textHeight, translateYAnimatedPosition, labelAnimatedValue, variant, placeholderLeftPosition],
  );

  const labelStyles = useMemo(
    () => labelTextStyles({ colors: themeColors, variant, ignoreOpacityOnNonEditable }),
    [themeColors, variant, ignoreOpacityOnNonEditable],
  );

  const onTextLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextLayoutRect(layout);
  };

  return (
    <Animated.View style={[styles, labelContainerStyles]}>
      <Animated.Text onLayout={onTextLayoutHandler}>
        {textLayoutRect ? (
          <Text variation="h4" disabled={editable} style={[labelStyles, style]} {...props}>
            {placeholder}
          </Text>
        ) : null}
      </Animated.Text>
    </Animated.View>
  );
};

InputLabel.displayName = 'InputLabel';
