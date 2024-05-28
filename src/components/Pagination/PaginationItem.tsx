import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { PaginationItemProps } from './PaginationTypes';
import { paginationItemStyles } from './utils';

export const ANIMATION_DURATION = 200;

export const PaginationItem: React.FC<PaginationItemProps> = ({
  style,
  sx,
  page,
  active,
  disabled,
  color = 'standard',
  shape = 'circular',
  variant = 'text',
  rippleBackgroundColor = '#fefefe2f',
  ...props
}) => {
  const isActive = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

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

  const styles = useMemo(
    () => paginationItemStyles({ color, isActive, theme, shape, variant, disabled }),
    [color, isActive, theme, shape, variant, disabled],
  );

  return (
    <BaseButton
      rippleProps={{
        rippleStyles: {
          backgroundColor: rippleBackgroundColor,
        },
      }}
      {...props}
      style={[styles, sx && generateElementStyles(sx), style]}>
      <Text mode={active ? 'light' : 'dark'}>{page}</Text>
    </BaseButton>
  );
};
