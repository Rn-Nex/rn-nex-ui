import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { AnimatedText, Text } from '../Typography';
import { InputLabelProps } from './InputTypes';
import { PLACEHOLDER_OUTLINE_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT } from './constants';
import { labelTransformStyle } from './utils';

export const InputLabel = function ({
  placeholder,
  labeled,
  variant,
  editable,
  translateYAnimatedPosition,
  placeholderLeftPosition,
  textInputLayoutRect,
  ...props
}: InputLabelProps) {
  const [textLayoutRect, setTextLayoutRect] = useState<LayoutRectangle>();
  const textHeight = textLayoutRect?.height ? textLayoutRect.height : TEXT_FONT_DEFAULT_HEIGHT;

  const onTextLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextLayoutRect(layout);
  };

  return (
    <Animated.View
      style={[
        labelTransformStyle({
          textHeight,
          translateYAnimatedPosition,
          labeled,
          variant,
          textInputLayoutRect,
          placeholderLeftPosition: placeholderLeftPosition || PLACEHOLDER_OUTLINE_LEFT_POSITION,
        }),
      ]}>
      <AnimatedText onLayout={onTextLayoutHandler}>
        {textLayoutRect ? (
          <Text variation="h3" disabled={!editable} {...props}>
            {placeholder}
          </Text>
        ) : null}
      </AnimatedText>
    </Animated.View>
  );
};

InputLabel.displayName = 'InputLabel';
