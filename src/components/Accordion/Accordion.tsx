import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BoxProps } from '../Box/BoxTypes';

export interface AccordionProps extends BoxProps {
  square?: boolean;
  disable?: boolean;
}

export const Accordion = React.forwardRef<View, AccordionProps>(
  ({ style, children, square = false, disable = false, ...props }, ref) => {
    const { theme } = useTheme();

    const accordionStyle = useMemo(() => {
      const style: ViewStyle = {
        width: '100%',
        backgroundColor: theme.colors.grey[200],
        opacity: disable ? 0.5 : 1,
        borderRadius: square ? 0 : 8,
      };
      return style;
    }, [disable, square, theme]);

    const overLayStyle = useMemo(() => {
      const styles: ViewStyle = {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 100,
      };
      return styles;
    }, []);

    return (
      <Box style={[accordionStyle, style]} {...props} ref={ref}>
        {disable ? <View style={[overLayStyle]} /> : null}
        {children}
      </Box>
    );
  },
);
Accordion.displayName = 'Accordion';
