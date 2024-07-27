import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View, LayoutChangeEvent, ViewStyle } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { generateElementStyles } from '../../utils';

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof TouchableWithoutFeedback>, 'onPress' | 'style'> {
  /**
   * Indicates the initial toggle state of the switch.
   * If true, the switch will be in the "on" position initially. Defaults to false.
   */
  initialToggleState?: boolean;

  /**
   * Callback function that is called when the switch is toggled.
   * The function receives the new toggle state as a boolean.
   */
  onToggle?: (state: boolean) => void;

  /**
   * Duration of the toggle animation in milliseconds.
   * Controls how long the animation takes to transition from one state to another. Defaults to 200ms.
   */
  toggleDuration?: number;

  /**
   * Custom styles for the thumb (the movable part) of the switch.
   * Accepts a style object to customize the appearance of the thumb.
   */
  thumbStyles?: ViewStyle;

  /**
   * Custom styles for the switch container.
   * Accepts a style object to customize the appearance of the switch container.
   */
  style?: ViewStyle;

  /**
   * Additional styles that can be applied to the switch component.
   * This property allows for the inclusion of any base styles, making the component more flexible.
   */
  sx?: BaseStyles;
}

export const Switch: React.FC<SwitchProps> = ({
  initialToggleState = false,
  onToggle,
  toggleDuration = 220,
  thumbStyles,
  style,
  sx,
  ...props
}) => {
  const [isToggled, setIsToggled] = useState(initialToggleState);
  const animatedValue = useRef(new Animated.Value(initialToggleState ? 1 : 0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0);

  useEffect(() => {
    animatedValue.setValue(isToggled ? 1 : 0);
  }, [isToggled]);

  const toggleSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: isToggled ? 0 : 1,
      duration: toggleDuration,
      useNativeDriver: false,
    }).start(() => {
      setIsToggled(!isToggled);
      if (onToggle) {
        onToggle(!isToggled);
      }
    });
  };

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleThumbLayout = (event: LayoutChangeEvent) => {
    setThumbWidth(event.nativeEvent.layout.width);
  };

  const switchStyles = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, containerWidth - thumbWidth - 4],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch} {...props}>
      <View style={[styles.switchContainer, style, sx && generateElementStyles(sx)]} onLayout={handleContainerLayout}>
        <Animated.View style={[styles.thumb, switchStyles, thumbStyles]} onLayout={handleThumbLayout} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E4E4E4',
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF',
  },
});
