import React, { useRef, useState } from 'react';
import { BaseInput } from './BaseInput';
import { OutlineProps, OutlinedTextFieldProps } from './InputTypes';
import { LayoutChangeEvent, LayoutRectangle, Text as RnText, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { AnimatedText, Text } from '../Typography';

const outlineDefaultStyles: ViewStyle = {
  width: '100%',
  overflow: 'hidden',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.white.dark,
  paddingHorizontal: 5,
  position: 'relative',
  height: 100,
};

const placeHolderDefaultStyles: TextStyle = {
  position: 'absolute',
  zIndex: 10,
};

export const Outline = React.forwardRef<View, OutlineProps>(({ style, ...props }, ref) => {
  return <View ref={ref} {...props} style={[outlineDefaultStyles, style]} />;
});

export const OutlinedTextField = React.forwardRef<View, OutlinedTextFieldProps>(
  ({ placeholder, outlineStyles, onLayout: onTextInputLayoutHandler, value, ...props }, ref) => {
    const [baseInputRectangle, setBaseInputRectangle] = useState<LayoutRectangle>();
    const animatedTextRef = useRef<RnText>(null);
    const [textLayoutRectangle, setTextLayoutRectangle] = useState<LayoutRectangle>();

    const onLayout = (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      const inputVerticalCenter = layout.height / 2;

      console.log({ layout });
      console.log({ inputVerticalCenter });

      if (animatedTextRef.current) {
        const elementStyles: TextStyle = {
          transform: [{ translateY: inputVerticalCenter - 12 }],
          left: 10,
        };
        animatedTextRef.current.setNativeProps({ style: elementStyles });
      }

      if (onTextInputLayoutHandler) {
        onTextInputLayoutHandler(event);
      }

      setBaseInputRectangle(layout);
    };

    return (
      <Outline {...outlineStyles} ref={ref} onLayout={onLayout}>
        <AnimatedText ref={animatedTextRef} style={placeHolderDefaultStyles}>
          <Text variation="h3" fontWeight={400}>
            {placeholder}
          </Text>
        </AnimatedText>
        <BaseInput {...props} />
      </Outline>
    );
  },
);
