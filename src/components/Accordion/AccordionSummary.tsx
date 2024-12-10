import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { accordionSummaryStyles } from './Accordion.style';
import { AccordionSummaryProps } from './Accordion.types';
import {
  ACCORDION_DETAILS_DEFAULT_EXPANDED,
  ACCORDION_DETAILS_OPACITY_DURATION,
  HEIGHT_VALUE_ANIMATION_DURATION,
  ROTATE_ANIMATION_DURATION,
  ROTATE_ANIMATION_RANGE,
} from './constants';

export const AccordionSummary = React.forwardRef<View, AccordionSummaryProps>(
  (
    {
      style,
      children,
      expandIcon,
      summaryChildWrapperStyles,
      expandIconWrapperStyles,
      accordionDetails,
      accordionWrapperStyles,
      topBorder,
      bottomBorder,
      onExpand,
      startAdornment,
      startAdornmentContainerStyle,
      childrenWrapperStyles,
      onPress: accordionSummaryOnPressHandler,
      disabled,
      accordionDetailsOpacityDuration = ACCORDION_DETAILS_OPACITY_DURATION,
      defaultExpanded = ACCORDION_DETAILS_DEFAULT_EXPANDED,
      rotateAnimationDuration = ROTATE_ANIMATION_DURATION,
      heightValueAnimationDuration = HEIGHT_VALUE_ANIMATION_DURATION,
      rotateAnimationRange = ROTATE_ANIMATION_RANGE,
      ...props
    },
    ref,
  ) => {
    const rotationValue = useRef(new Animated.Value(0)).current;
    const heightValue = useRef(new Animated.Value(0)).current;
    const accordionDetailsOpacityValue = useRef(new Animated.Value(0)).current;

    const [isActive, setIsActive] = useState<boolean>(false);
    const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
    const accordionContentRef = useRef<View>(null);
    const themeColor = useThemeColorsSelector();

    const summaryWrapperStyles = useMemo(() => {
      let styles: ViewStyle = {};
      if (topBorder) {
        styles.borderTopWidth = 1;
        styles.borderTopColor = themeColor.grey[300];
      }

      if (bottomBorder) {
        styles.borderBottomColor = themeColor.grey[300];
        styles.borderBottomWidth = 1;
      }

      return styles;
    }, [topBorder, bottomBorder, themeColor]);

    useEffect(() => {
      const animations: Animated.CompositeAnimation[] = [];

      animations.push(
        Animated.timing(rotationValue, {
          toValue: isActive ? 1 : 0,
          duration: rotateAnimationDuration,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      );

      if (measuredHeight !== null) {
        animations.push(
          Animated.timing(heightValue, {
            toValue: isActive ? measuredHeight : 0,
            duration: heightValueAnimationDuration,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
        );

        animations.push(
          Animated.timing(accordionDetailsOpacityValue, {
            toValue: isActive ? 1 : 0,
            duration: accordionDetailsOpacityDuration,
            easing: Easing.ease,
            useNativeDriver: false,
          }),
        );
      }

      Animated.parallel(animations).start();

      if (isActive && !!onExpand && typeof onExpand === 'function') {
        onExpand();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, rotationValue, heightValue, accordionDetailsOpacityValue, measuredHeight]);

    useEffect(() => {
      setIsActive(defaultExpanded);
    }, [defaultExpanded]);

    const onPress = (event: GestureResponderEvent) => {
      if (!!accordionSummaryOnPressHandler && typeof accordionSummaryOnPressHandler === 'function') {
        accordionSummaryOnPressHandler(event);
      }
      setIsActive(!isActive);
    };

    const rotateInterpolate = rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: rotateAnimationRange,
    });

    const onContentLayout = (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (measuredHeight === null) {
        setMeasuredHeight(height);
      }
    };

    useEffect(() => {
      setMeasuredHeight(null);
    }, [accordionDetails]);

    return (
      <View ref={ref}>
        <TouchableWithoutFeedback onPress={onPress} disabled={disabled} {...props}>
          <View
            style={StyleSheet.flatten([accordionSummaryStyles.accordionSummaryWrapperContainer, summaryWrapperStyles, style])}>
            <View style={StyleSheet.flatten([accordionSummaryStyles.accordionSummaryChildWrapper, summaryChildWrapperStyles])}>
              {startAdornment && (
                <View style={StyleSheet.flatten([accordionSummaryStyles.startAdornmentContainer, startAdornmentContainerStyle])}>
                  {startAdornment}
                </View>
              )}
              <Box style={StyleSheet.flatten([accordionSummaryStyles.accordionSummaryChildrenWrapper, childrenWrapperStyles])}>
                {children}
              </Box>
            </View>
            <Animated.View
              style={StyleSheet.flatten([
                accordionSummaryStyles.accordionSummaryExpandIconWrapper,
                { transform: [{ rotate: rotateInterpolate }] },
                expandIconWrapperStyles,
              ])}>
              {expandIcon}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={StyleSheet.flatten([
            { height: heightValue, opacity: accordionDetailsOpacityValue },
            accordionSummaryStyles.accordionDetailsContainer,
          ])}>
          <View
            ref={accordionContentRef}
            style={StyleSheet.flatten([
              accordionSummaryStyles.accordionDetailsWrapper,
              { height: measuredHeight },
              accordionWrapperStyles,
            ])}>
            {accordionDetails}
          </View>
        </Animated.View>
        {measuredHeight === null && (
          <View style={accordionSummaryStyles.hiddenView} onLayout={onContentLayout}>
            {accordionDetails}
          </View>
        )}
      </View>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';
