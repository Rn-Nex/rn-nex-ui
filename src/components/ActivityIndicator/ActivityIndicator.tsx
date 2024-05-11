import React from 'react';
import { ActivityIndicator as RnActivityIndicator } from 'react-native';
import { ActivityIndicatorProps } from './ActivityIndicatorTypes';

export const ActivityIndicator = React.forwardRef<
   RnActivityIndicator,
   ActivityIndicatorProps
>((props, ref) => {
   return <RnActivityIndicator ref={ref} {...props} />;
});
