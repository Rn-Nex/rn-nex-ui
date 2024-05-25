import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SnackbarProps } from './SnackbarTypes';
import { AnimatedView } from '../Box';

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  visible,
  resumeHideDuration,
  actionComponent,
  style,
  messageStyle,
  onHide,
  startAdornment,
  startAdornmentContainerStyle,
  anchorOrigin = { horizontal: 'center', vertical: 'bottom' },
  autoHideDuration = null,
  animationDuration = 300,
  backgroundColor = '#333',
  textColor = '#fff',
  elevation = 6,
  borderRadius = 5,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();

      if (autoHideDuration !== null) {
        timerRef.current = setTimeout(() => {
          hideSnackbar();
        }, autoHideDuration);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else {
      slideAnim.setValue(0);
    }
  }, [visible, slideAnim, animationDuration, autoHideDuration]);

  const hideSnackbar = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start(() => {
      if (onHide) {
        onHide();
      }
    });
  };

  const handleInteraction = () => {
    if (autoHideDuration !== null && resumeHideDuration !== undefined) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        hideSnackbar();
      }, resumeHideDuration);
    }
  };

  const slideIn = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [anchorOrigin.vertical === 'bottom' ? 100 : -100, 0],
        }),
      },
    ],
  };

  const horizontalPosition = (() => {
    switch (anchorOrigin.horizontal) {
      case 'left':
        return { left: 20 };
      case 'right':
        return { right: 20 };
      case 'center':
      default:
        return { left: 20, right: 20 };
    }
  })();

  return (
    <>
      {visible && (
        <AnimatedView
          style={[
            styles.snackbar,
            slideIn,
            {
              backgroundColor,
              elevation,
              borderRadius,
              [anchorOrigin.vertical]: 20,
              ...horizontalPosition,
            },
            style,
          ]}
          onTouchStart={handleInteraction}>
          {startAdornment && <View style={[styles.startAdornmentContainer, startAdornmentContainerStyle]}>{startAdornment}</View>}
          <Text style={[styles.message, { color: textColor }, messageStyle]}>{message}</Text>
          {actionComponent && <View style={styles.actionComponentContainer}>{actionComponent}</View>}
        </AnimatedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '90%',
  },
  message: {
    flexShrink: 1,
  },
  actionComponentContainer: {
    marginLeft: 10,
  },
  startAdornmentContainer: {
    marginRight: 10,
  },
});
