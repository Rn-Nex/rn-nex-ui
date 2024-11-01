import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, GestureResponderEvent, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { getVariant, VariantTypes } from '../../utils';
import { BaseButton } from '../Button';
import { Text } from '../Typography';
import { RippleProps, TextProps } from '../types';
import { styles } from './Radio.styles';
import { RADIO_LARGE, RADIO_MEDIUM, RADIO_SMALL } from './constants';

export interface SizeConfig {
  /**
   * Size configuration for radio buttons
   */
  small: number;
  medium: number;
  large: number;
}

export type RadioTypes = keyof SizeConfig;

export interface BaseInterface {
  /**
   * Indicates if the radio button is currently active
   */
  isActive?: boolean;
  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;
  /**
   * Size of the radio button, using keys from SizeConfig
   */
  size?: RadioTypes;
  /**
   * Custom size configuration for different radio button sizes
   */
  sizeConfig?: SizeConfig;
  /**
   * Color to use when the radio button is active
   */
  activeColor?: string;
}

export interface RadioOutlineProps extends ViewProps, Omit<BaseInterface, 'size' | 'sizeConfig' | 'activeColor'> {}

export interface RadioCircleProps extends ViewProps, BaseInterface {
  /**
   * Variant type for customizing the appearance of the radio button
   */
  variant?: VariantTypes;
}

export interface RadioProps extends ViewProps, BaseInterface {
  /**
   * Variant type for customizing the appearance of the radio button
   */
  variant?: VariantTypes;
  /**
   * Function to handle press events on the radio button
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Label to display alongside the radio button
   */
  label?: string;
  /**
   * Description text to provide more context for the radio button
   */
  description?: string;
  /**
   * Styles for the container holding the label
   */
  labelContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Additional props for customizing the label text
   */
  labelProps?: TextProps;
  /**
   * Styles for the container holding the radio button
   */
  radioContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Indicates whether the radio button is disabled
   */
  disabled?: boolean;
  /**
   * Gap size between radio items
   */
  gap?: number;
  /**
   * Custom content to display inside the radio button
   */
  radioItem?: React.ReactNode;
  /**
   * Styles for the container holding the radio item
   */
  radioItemContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Props for customizing ripple effect on press
   */
  rippleProps?: RippleProps;
  /**
   * Flag to disable the ripple effect on press
   */
  disableRipple?: boolean;
  /**
   * Styles for the base button used in the radio button
   */
  baseButtonStyles?: StyleProp<ViewStyle>;
  /**
   * Flag to disable scaling animation on button press
   */
  disableButtonScaleAnimation?: boolean;
  /**
   * Content to display at the start of the radio button
   */
  startAdornment?: React.ReactNode;
  /**
   * Styles for the container holding the start adornment
   */
  startAdornmentContainerStyles?: StyleProp<ViewStyle>;
  /**
   * Content to display at the end of the radio button
   */
  endAdornment?: React.ReactNode;
  /**
   * Styles for the container holding the end adornment
   */
  endAdornmentContainerStyles?: StyleProp<ViewStyle>;
}

export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      style,
      sizeConfig,
      onPress,
      label,
      labelProps,
      radioContainerStyles,
      activeColor,
      labelContainerStyles,
      description,
      radioItem,
      radioItemContainerStyles,
      rippleProps,
      baseButtonStyles,
      startAdornment,
      startAdornmentContainerStyles,
      endAdornment,
      endAdornmentContainerStyles,
      disableButtonScaleAnimation = true,
      disableRipple = true,
      gap = 8,
      disabled = false,
      size = 'medium',
      isActive = false,
      animationDuration = 100,
      variant = 'info',
      ...props
    },
    ref,
  ) => {
    const radioOnPressHandler = (event: GestureResponderEvent) => {
      if (!!onPress && typeof onPress === 'function') {
        onPress(event);
      }
    };

    return (
      <View ref={ref} style={[style]} {...props}>
        <BaseButton
          onPress={radioOnPressHandler}
          disabled={disabled}
          rippleProps={rippleProps}
          disableRipple={disableRipple}
          style={StyleSheet.flatten([styles.baseButton, baseButtonStyles])}
          disableScaleAnimation={disableButtonScaleAnimation}>
          <View style={StyleSheet.flatten([styles.radioContainer, radioContainerStyles, { opacity: disabled ? 0.5 : 1, gap }])}>
            {startAdornment && <View style={[startAdornmentContainerStyles]}>{startAdornment}</View>}
            <RadioOutline isActive={isActive} animationDuration={animationDuration}>
              {radioItem ? (
                <View style={StyleSheet.flatten([styles.radioItemContainer, radioItemContainerStyles])}>
                  {isActive ? radioItem : null}
                </View>
              ) : (
                <RadioCircle
                  isActive={isActive}
                  variant={variant}
                  animationDuration={animationDuration}
                  size={size}
                  sizeConfig={sizeConfig}
                  activeColor={activeColor}
                />
              )}
            </RadioOutline>
            {endAdornment ? (
              <View style={[endAdornmentContainerStyles]}>{endAdornment}</View>
            ) : (
              <View style={[labelContainerStyles]}>
                {label && (
                  <Text variation="h4" {...labelProps}>
                    {label}
                  </Text>
                )}
                {description && <Text variation="h5">{description}</Text>}
              </View>
            )}
          </View>
        </BaseButton>
      </View>
    );
  },
);

const RadioOutline: React.FC<RadioOutlineProps> = ({ style, isActive, children, animationDuration, ...props }) => {
  const borderColorValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  useEffect(() => {
    Animated.timing(borderColorValue, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  const borderColorInterpolation = borderColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.grey[400], theme.colors.grey[800]],
  });

  return (
    <Animated.View style={StyleSheet.flatten([styles.radioOutline, { borderColor: borderColorInterpolation }, style])} {...props}>
      {children}
    </Animated.View>
  );
};

const RadioCircle: React.FC<RadioCircleProps> = ({
  style,
  variant,
  isActive,
  animationDuration,
  size,
  sizeConfig,
  activeColor,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const backgroundColorValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isActive ? 1 : 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorValue, {
        toValue: isActive ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, animationDuration]);

  const colorVariation = useMemo(() => getVariant({ variant, theme }), [variant, theme]);

  const getSize = useMemo(() => {
    if (size === 'small') return sizeConfig?.small || RADIO_SMALL;
    else if (size === 'medium') return sizeConfig?.medium || RADIO_MEDIUM;
    else if (size === 'large') return sizeConfig?.large || RADIO_LARGE;
    else return RADIO_SMALL;
  }, [size, sizeConfig]);

  const backgroundColorInterpolation = backgroundColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', activeColor || colorVariation],
  });

  const animatedStyle: ViewStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.radioCircle,
        animatedStyle,
        { backgroundColor: backgroundColorInterpolation, width: getSize, height: getSize },
        style,
      ])}
      {...props}
    />
  );
};

Radio.displayName = 'Radio';
RadioOutline.displayName = 'RadioOutline';
RadioCircle.displayName = 'RadioCircle';
