import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseButton } from './BaseButton';
import { getButtonStyles } from './Button.styles';
import { IconButtonProps } from './Button.types';

export const IconButton = React.forwardRef<View, IconButtonProps>(
  ({ disabled, children, style, variation = 'roundedIconButton', ...props }, ref) => {
    const { theme } = useTheme();
    const iconButtonStyles = useMemo(() => getButtonStyles({ variation, disabled, theme }), [variation, disabled, theme]);

    return (
      <BaseButton
        rippleEdge="center"
        ref={ref}
        style={StyleSheet.flatten([iconButtonStyles, style])}
        baseButtonContainerStyle={{ flexDirection: 'column' }}
        {...props}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
