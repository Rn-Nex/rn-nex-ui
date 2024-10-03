import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './Box.types';
import { BOX_GENERATED_CLASSNAMES } from './constants';

export const Box = React.forwardRef<View, BoxProps>(({ children, style, sx, ...props }, ref) => {
  const generatedStyles = useMemo(() => {
    return StyleSheet.create({ [BOX_GENERATED_CLASSNAMES.RN_NIX_BOX_SX_CLASS]: sx ? generateElementStyles(sx) : {} });
  }, [sx]);

  return (
    <View ref={ref} style={[generatedStyles[BOX_GENERATED_CLASSNAMES.RN_NIX_BOX_SX_CLASS], style]} {...props}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
