import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box.types';
import { accordionStyles } from './Accordion.style';

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

    return (
      <Box style={[accordionStyle, style]} {...props} ref={ref}>
        {disable ? <View style={[accordionStyles.overLay]} /> : null}
        {children}
      </Box>
    );
  },
);
Accordion.displayName = 'Accordion';
