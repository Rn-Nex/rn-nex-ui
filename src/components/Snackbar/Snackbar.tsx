import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  DeviceEventEmitter,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { screenHeight } from '../../utils';
import { Button } from '../Button';
import { ButtonProps, TextProps } from '../types';
import { Text } from '../Typography';
import { SHOW_SNACK_BAR_MESSAGE } from './constants';
import { styles } from './Snackbar.styles';
import { Avatar } from '../Avatar';

export interface SnackbarProperties {
  message: string;
  showActionButton?: boolean;
  actionButtonLabel?: string;
  actionButtonOnPress?: (event: GestureResponderEvent) => void;
  actionButtonProps?: ButtonProps;
  animationDuration?: number;
  hideDuration?: number;
  shouldHideWhenClickedOnActionButton?: boolean;
  startAdornment?: React.ReactNode;
  startAdornmentContainerStyles?: StyleProp<ViewStyle>;
}
export interface SnackbarProps extends ViewProps {
  snackbarLabelContainerStyles?: StyleProp<ViewStyle>;
  labelProps?: TextProps;
  position?: 'top' | 'bottom';
  autoHide?: boolean;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  style,
  snackbarLabelContainerStyles,
  labelProps,
  autoHide = false,
  position = 'bottom',
  ...props
}) => {
  const isTop = position === 'top';
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarProperties | null>(null);
  const opacityValue = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(isTop ? -100 : screenHeight)).current;

  const hideAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: snackbarConfig?.animationDuration || 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: isTop ? -100 : screenHeight,
        duration: snackbarConfig?.animationDuration || 500,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setSnackbarConfig(null);
      }
    });
  }, [position]);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: snackbarConfig?.animationDuration || 500,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isTop ? 50 : screenHeight - 100,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished && autoHide) {
        setTimeout(() => {
          hideAnimation();
        }, snackbarConfig?.hideDuration || 300);
      }
    });
  }, [position]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_SNACK_BAR_MESSAGE, (config: SnackbarProperties) => {
      setSnackbarConfig(config);
      startAnimation();
    });

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const actionButtonOnPressHandler = useCallback(
    (event: GestureResponderEvent) => {
      if (snackbarConfig?.actionButtonOnPress && typeof snackbarConfig.actionButtonOnPress === 'function') {
        snackbarConfig.actionButtonOnPress(event);
        if (snackbarConfig?.shouldHideWhenClickedOnActionButton) {
          hideAnimation();
        }
      }
    },
    [snackbarConfig],
  );

  if (!snackbarConfig?.message) return null;

  return (
    <Animated.View
      style={StyleSheet.flatten([styles.snackbarRootContainer, { opacity: opacityValue, transform: [{ translateY }] }, style])}
      {...props}>
      <View style={StyleSheet.flatten([styles.snackbar])}>
        <View style={styles.snackbarLabelWrapper}>
          {snackbarConfig?.startAdornment && <View style={[styles.adornment]}>{snackbarConfig.startAdornment}</View>}
          <View style={StyleSheet.flatten([styles.snackbarLabelContainer, snackbarLabelContainerStyles])}>
            {snackbarConfig?.message && (
              <Text variation="h3" mode="light" {...labelProps}>
                {snackbarConfig.message}
              </Text>
            )}
          </View>
        </View>
        {snackbarConfig?.showActionButton && (
          <View style={[styles.snackbarOptionContainer]}>
            <Button
              variation="text"
              label={snackbarConfig?.actionButtonLabel || 'HIDE'}
              onPress={actionButtonOnPressHandler}
              labelProps={{ style: styles.buttonLabel }}
              {...snackbarConfig?.actionButtonOnPress}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
};
