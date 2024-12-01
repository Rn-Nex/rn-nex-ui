import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BoxProps } from '../Box/Box.types';
import { accordionWrapperStyles } from './Accordion.style';

export interface AccordionProps extends BoxProps {
  square?: boolean;
  disable?: boolean;
}

export const Accordion = React.forwardRef<View, AccordionProps>(
  ({ style, children, square = false, disable = false, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <Box style={StyleSheet.flatten([accordionWrapperStyles({ theme, disable, square }), style])} {...props} ref={ref}>
        {React.Children.map(children, child =>
          React.isValidElement(child) ? React.cloneElement<any>(child, { disabled: disable }) : child,
        )}
      </Box>
    );
  },
);
Accordion.displayName = 'Accordion';
