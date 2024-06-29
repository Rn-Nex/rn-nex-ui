import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { ContainerProps } from './BoxTypes';
import { generateContainerStyles } from './utils';
import { generateElementStyles } from '../../utils';

export const Container = React.forwardRef<View, ContainerProps>(({ sx, style, maxWidth, disableGutters, ...props }, ref) => {
  const containerStyles = useMemo(() => {
    let styles: ViewStyle = {
      ...generateContainerStyles({ maxWidth, disableGutters }),
    };

    if (sx) {
      styles = { ...styles, ...generateElementStyles(sx) };
    }

    return styles;
  }, [sx, maxWidth, disableGutters]);
  return <View style={[style, containerStyles]} ref={ref} {...props} />;
});
