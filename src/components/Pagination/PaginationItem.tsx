import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { paginationItemStyles, styles } from './Pagination.style';
import { PaginationItemProps } from './Pagination.types';

export const ANIMATION_DURATION = 200;

export const PaginationItem: React.FC<PaginationItemProps> = ({
  style,
  page,
  active,
  disabled,
  color,
  testID = 'pagination-item-test-id',
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
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(isActive, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  const paginationItemS = useMemo(
    () => paginationItemStyles({ color, isActive, theme, shape, variant, disabled }),
    [color, isActive, theme, shape, variant, disabled],
  );

  return (
    <BaseButton
      rippleProps={{ rippleStyles: { backgroundColor: rippleBackgroundColor } }}
      disableBaseButtonContainerFlex
      style={[styles.paginationItem, paginationItemS, style]}
      disabled={disabled}
      testID={`${testID}-${page}`}
      {...props}>
      <Text>{page}</Text>
    </BaseButton>
  );
};
