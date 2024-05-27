import React, { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { PaginationItemProps } from './PaginationTypes';
import { paginationItemStyles } from './utils';
import { Animated } from 'react-native';

export const ANIMATION_DURATION = 200;

export const PaginationItem: React.FC<PaginationItemProps> = ({
  style,
  sx,
  page,
  active,
  rippleBackgroundColor = '#fefefe2f',
  ...props
}) => {
  const isActive = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const styles = useMemo(() => paginationItemStyles({}), []);

  useEffect(() => {
    if (active) {
      Animated.timing(isActive, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(isActive, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }
  }, [active]);

  const backgroundColorInterpolation = isActive.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', theme.colors.lightBlue[800]],
  });

  return (
    <BaseButton
      rippleProps={{
        rippleStyles: {
          backgroundColor: rippleBackgroundColor,
        },
      }}
      {...props}
      style={[styles, { backgroundColor: backgroundColorInterpolation as any }, sx && generateElementStyles(sx), style]}>
      <Text>{page}</Text>
    </BaseButton>
  );
};
