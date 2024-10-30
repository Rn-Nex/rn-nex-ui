import { useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import { useTheme } from '../../libraries';
import { Text } from '../Typography';
import { InputLabelProps } from './Input.types';
import { labelTextStyles, labelTransformStyle } from './TextField.style';
import { PLACEHOLDER_OUTLINE_LEFT_POSITION, TEXT_FONT_DEFAULT_HEIGHT } from './constants';

export const InputLabel: React.FC<InputLabelProps> = function ({
  placeholder,
  labeled,
  editable,
  translateYAnimatedPosition,
  placeholderLeftPosition,
  labelContainerStyles,
  style,
  ignoreOpacityOnNonEditable,
  variant = 'outlined',
  ...props
}) {
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
        placeholderLeftPosition: placeholderLeftPosition || PLACEHOLDER_OUTLINE_LEFT_POSITION,
      }),
    [theme, textHeight, translateYAnimatedPosition, labeled, variant, placeholderLeftPosition],
  );

  const labelStyles = useMemo(
    () => labelTextStyles({ theme, variant, ignoreOpacityOnNonEditable }),
    [theme, variant, ignoreOpacityOnNonEditable],
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
