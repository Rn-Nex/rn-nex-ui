import React from 'react';
import { Animated, View } from 'react-native';

export interface AnimatedViewProps extends React.ComponentPropsWithRef<typeof Animated.View> {}

export const AnimatedView = React.forwardRef<View, AnimatedViewProps>((props, ref) => {
  return <Animated.View {...props} ref={ref} />;
});
