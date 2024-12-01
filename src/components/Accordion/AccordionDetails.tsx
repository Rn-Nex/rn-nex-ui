import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface AccordionDetailsProps extends React.ComponentPropsWithRef<typeof View> {
  disable?: boolean;
}

export const AccordionDetails = React.forwardRef<View, AccordionDetailsProps>(({ style, disable, children, ...props }, ref) => {
  const accordionStyle = useMemo(() => {
    const style: ViewStyle = {
      width: '100%',
      opacity: disable ? 0.5 : 1,
      paddingTop: 8,
      paddingHorizontal: 12,
      paddingBottom: 15,
    };
    return style;
  }, [disable]);

  return (
    <View style={StyleSheet.flatten([accordionStyle, style])} {...props} ref={ref}>
      {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement<any>(child, { disabled: disable }) : child,
      )}
    </View>
  );
});

AccordionDetails.displayName = 'AccordionDetails';
