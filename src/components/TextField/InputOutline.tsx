import { View, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import React from 'react';
import { OutlineProps } from './InputTypes';

const outlineDefaultStyles: ViewStyle = {
  width: '100%',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.white.dark,
  paddingHorizontal: 10,
  position: 'relative',
};

export const Outline = React.forwardRef<View, OutlineProps>(({ error, style, isFocused, ...props }, ref) => {
  const styles: ViewStyle = {
    borderColor: error ? colors.error.light : isFocused ? colors.blue.dark : colors.white.dark,
  };

  return <View ref={ref} {...props} style={[outlineDefaultStyles, styles, style]} />;
});
