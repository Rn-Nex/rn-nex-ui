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
import { useTheme } from '../../libraries';
import { AccordionSummaryProps } from './AccordionTypes';

export const AccordionSummary = React.forwardRef<TouchableWithoutFeedback, AccordionSummaryProps>(
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
      onPress: accordionSummaryOnPressHandler,
      accordionDetailsOpacityDuration = 200,
      defaultExpanded = false,
      rotateAnimationDuration = 150,
      heightValueAnimationDuration = 200,
      rotateAnimationRange = ['0deg', '180deg'],
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
    const { theme } = useTheme();

    const summaryWrapperStyles = useMemo(() => {
      let styles: ViewStyle = {};
      if (topBorder) {
        styles.borderTopWidth = 1;
        styles.borderTopColor = theme.colors.grey[300];
      }

      if (bottomBorder) {
        styles.borderBottomColor = theme.colors.grey[300];
        styles.borderBottomWidth = 1;
      }

      return styles;
    }, [topBorder, bottomBorder]);

    useEffect(() => {
      const animations = [];

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

    return (
      <View>
        <TouchableWithoutFeedback onPress={onPress} {...props} ref={ref}>
          <View style={[styles.accordionSummaryWrapperContainer, summaryWrapperStyles, style]}>
            <View style={[styles.accordionSummaryChildWrapper, summaryChildWrapperStyles]}>{children}</View>
            <Animated.View
              style={[
                styles.accordionSummaryExpandIconWrapper,
                { transform: [{ rotate: rotateInterpolate }] },
                expandIconWrapperStyles,
              ]}>
              {expandIcon}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={{ height: heightValue, opacity: accordionDetailsOpacityValue, overflow: 'hidden' }}>
          <View
            ref={accordionContentRef}
            style={[styles.accordionDetailsWrapper, { height: measuredHeight }, accordionWrapperStyles]}>
            {accordionDetails}
          </View>
        </Animated.View>
        {measuredHeight === null && (
          <View style={styles.hiddenView} onLayout={onContentLayout}>
            {accordionDetails}
          </View>
        )}
      </View>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';

const styles = StyleSheet.create({
  accordionSummaryWrapperContainer: {
    padding: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accordionSummaryChildWrapper: {
    width: '90%',
  },
  accordionSummaryExpandIconWrapper: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  accordionDetailsWrapper: {
    width: '100%',
  },
  hiddenView: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
});
