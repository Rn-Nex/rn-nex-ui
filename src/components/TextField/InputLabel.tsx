import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { AnimatedText, Text } from '../Typography';
import { InputLabelProps } from './InputTypes';
import { PLACEHOLDER_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT, TRANSLATE_Y_ANIMATED_DEFAULT_POSITION } from './constants';

export const InputLabel = function ({
  placeholder,
  labeled,
  translateYAnimatedPosition = TRANSLATE_Y_ANIMATED_DEFAULT_POSITION,
  placeholderLeftPosition = PLACEHOLDER_LEFT_POSITION,
  ...props
}: InputLabelProps) {
  const [textLayoutRect, setTextLayoutRect] = useState<LayoutRectangle>();
  const textHeight = textLayoutRect?.height ? textLayoutRect.height : TEXT_FONT_DEFAULT_HEIGHT;

  const placeHolderDefaultStyles: TextStyle = {
    position: 'absolute',
    zIndex: 10,
    color: colors.black.light,
    top: '50%',
    left: placeholderLeftPosition,
    backgroundColor: colors.white.main,
    paddingHorizontal: 8,
  };

  const onTextLayoutHandler = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setTextLayoutRect(layout);
  };

  const labelTransformStyle: ViewStyle = {
    transform: [
      {
        translateY: labeled
          ? labeled.interpolate({
              inputRange: [0, 1],
              outputRange: [-(textHeight / 2), translateYAnimatedPosition + -(textHeight / 2)],
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

  const labelStyle: ViewStyle = {
    ...placeHolderDefaultStyles,
    ...labelTransformStyle,
  };

  return (
    <Animated.View style={labelStyle}>
      <AnimatedText onLayout={onTextLayoutHandler}>
        {textLayoutRect ? (
          <Text variation="h3" fontWeight={400} {...props}>
            {placeholder}
          </Text>
        ) : null}
      </AnimatedText>
    </Animated.View>
  );
};

InputLabel.displayName = 'InputLabel';
