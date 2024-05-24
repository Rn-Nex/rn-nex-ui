import { useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useTheme } from '../../libraries';
import { AnimatedText, Text } from '../Typography';
import { InputLabelProps } from './InputTypes';
import { PLACEHOLDER_OUTLINE_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT } from './constants';
import { labelTextStyles, labelTransformStyle } from './utils';

export const InputLabel = function ({
  placeholder,
  labeled,
  variant,
  editable,
  translateYAnimatedPosition,
  placeholderLeftPosition,
  textInputLayoutRect,
  labelContainerStyles,
  style,
  ...props
}: InputLabelProps) {
  const { theme } = useTheme();
  const [textLayoutRect, setTextLayoutRect] = useState<LayoutRectangle>();
  const textHeight = textLayoutRect?.height ? textLayoutRect.height : TEXT_FONT_DEFAULT_HEIGHT;

  const styles = useMemo(
    () =>
      labelTransformStyle({
        theme,
        textHeight,
        translateYAnimatedPosition,
        labeled,
        variant,
        textInputLayoutRect,
        placeholderLeftPosition: placeholderLeftPosition || PLACEHOLDER_OUTLINE_LEFT_POSITION,
      }),
    [theme, textHeight, translateYAnimatedPosition, labeled, variant, textInputLayoutRect, placeholderLeftPosition],
  );

  const labelStyles = useMemo(() => labelTextStyles(theme), [theme]);

  const onTextLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextLayoutRect(layout);
  };

  return (
    <Animated.View style={[styles, labelContainerStyles]}>
      <AnimatedText onLayout={onTextLayoutHandler}>
        {textLayoutRect ? (
          <Text variation="h3" disabled={!editable} style={[labelStyles, style]} {...props}>
            {placeholder}
          </Text>
        ) : null}
      </AnimatedText>
    </Animated.View>
  );
};

InputLabel.displayName = 'InputLabel';
