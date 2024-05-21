import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { IconButtonProps } from './ButtonTypes';
import { getButtonStyles } from './utils';
import { useTheme } from '../../libraries';

export const IconButton = React.forwardRef<TouchableWithoutFeedback, IconButtonProps>(
  ({ disabled, children, style, sx, variation = 'roundedIconButton', ...props }, ref) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getButtonStyles({ variation, disabled, theme }), [variation, disabled, theme]);

    return (
      <BaseButton rippleEdge="center" {...props} ref={ref} style={[styles, sx && generateElementStyles(sx), style]}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
