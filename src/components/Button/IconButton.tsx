import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { generateElementStyles } from '../../utils';
import { BaseButton } from './BaseButton';
import { IconButtonProps } from './Button.types';
import { getButtonStyles } from './utils';

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
