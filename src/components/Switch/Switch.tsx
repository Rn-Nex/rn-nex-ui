import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeSwitchConfigSelector } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { DefaultVariationOptions, generateElementStyles, getVariant, VariantTypes, VariationThemeConfig } from '../../utils';
import { getSwitchSizes } from './utils';

export type SwitchThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

/**
 * Define a union type for the possible size of a switch component
 */
export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof TouchableWithoutFeedback>, 'onPress' | 'style'> {
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
   * Duration of the toggle wrapper animation in milliseconds.
   * Controls how long the animation takes to transition from one state to another. Defaults to 200ms.
   */
  toggleWrapperBgDuration?: number;

  /**
   * Active background color of the switch component
   */
  wrapperDefaultBgColor?: string;

  /**
   * Default background color of the switch component
   */
  wrapperActiveBgColor?: string;

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

  /**
   * including 'primary', 'secondary', 'success', 'error', 'info', or 'warning'.
   */
  variant?: VariantTypes;

  /**
   * including 'small', 'medium', 'large',
   */
  size?: SwitchSize;

  /**
   * testID for the switch container
   */
  containerTestID?: string;

  /**
   * testID for the switch thumb
   */
  thumbTestID?: string;
}

export interface GetSwitchSizesArgs extends Pick<SwitchProps, 'size'> {}

export const Switch = React.forwardRef<View, SwitchProps>(
  (
    {
      onToggle,
      wrapperActiveBgColor,
      wrapperDefaultBgColor,
      thumbStyles,
      style,
      sx,
      containerTestID,
      thumbTestID,
      variant = 'primary',
      size = 'medium',
      initialToggleState = false,
      toggleWrapperBgDuration = 200,
      toggleDuration = 220,
      ...props
    },
    ref,
  ) => {
    const [isToggled, setIsToggled] = useState(false);
    const animatedValue = useRef(new Animated.Value(initialToggleState ? 1 : 0)).current;
    const switchWrapperBgAnimatedValue = useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = useState(0);
    const [thumbWidth, setThumbWidth] = useState(0);

    const themeColors = useThemeColorsSelector();
    const switchThemeConfig = useThemeSwitchConfigSelector();

    const {
      toggleDuration: themeToggleDuration = toggleDuration,
      toggleWrapperBgDuration: themeToggleWrapperBgDuration = toggleWrapperBgDuration,
      wrapperDefaultBgColor: themeWrapperDefaultBgColor = wrapperDefaultBgColor,
      wrapperActiveBgColor: themeWrapperActiveBgColor = wrapperActiveBgColor,
      thumbStyles: themeThumbStyles = thumbStyles,
      style: themeStyle = style,
      sx: themeSx = sx,
      colors: themeColorScheme,
    } = switchThemeConfig || {};

    useEffect(() => {
      setIsToggled(initialToggleState);
    }, [initialToggleState]);

    useEffect(() => {
      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: isToggled ? 1 : 0,
          duration: themeToggleDuration,
          useNativeDriver: false,
        }),
        Animated.timing(switchWrapperBgAnimatedValue, {
          toValue: isToggled ? 1 : 0,
          duration: themeToggleWrapperBgDuration,
          useNativeDriver: false,
        }),
      ]).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isToggled]);

    const toggleSwitch = () => {
      setIsToggled(!isToggled);
      if (onToggle && typeof onToggle === 'function') {
        onToggle(!isToggled);
      }
    };

    const handleContainerLayout = (event: LayoutChangeEvent) => {
      setContainerWidth(event.nativeEvent.layout.width);
    };

    const handleThumbLayout = (event: LayoutChangeEvent) => {
      setThumbWidth(event.nativeEvent.layout.width);
    };

    const switchStyles: ViewStyle = {
      transform: [
        {
          translateX: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth - thumbWidth - 4],
          }),
        },
      ],
    };

    const colorVariation = useMemo(
      () => getVariant({ variant, colors: themeColors, config: themeColorScheme }),
      [variant, themeColors, themeColorScheme],
    ) as string;

    const switchSizeVariation = useMemo(() => getSwitchSizes({ size }), [size]);

    const backgroundColorInterpolation = switchWrapperBgAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [themeWrapperDefaultBgColor ?? themeColors.grey[300], themeWrapperActiveBgColor ?? colorVariation],
    });

    return (
      <View ref={ref}>
        <TouchableWithoutFeedback onPress={toggleSwitch} {...props}>
          <Animated.View
            style={StyleSheet.flatten([
              styles.switchContainer,
              switchSizeVariation.thumbContainerStyles,
              { backgroundColor: backgroundColorInterpolation },
              themeStyle,
              themeSx && generateElementStyles(themeSx),
            ])}
            onLayout={handleContainerLayout}
            testID={containerTestID}>
            <Animated.View
              style={StyleSheet.flatten([styles.thumb, switchSizeVariation.thumbStyles, switchStyles, themeThumbStyles])}
              onLayout={handleThumbLayout}
              testID={thumbTestID}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    borderRadius: 13,
    backgroundColor: '#FFF',
  },
});
