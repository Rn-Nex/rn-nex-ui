import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { DialogActionsProps } from './DialogTypes';
import { dialogActionsStyles } from './utils';

export const DialogActions = React.forwardRef<View, DialogActionsProps>(
  ({ style, children, dialogActionsContainerProps, ...props }, ref) => {
    return (
      <Box ref={ref} {...props} style={[dialogActionsStyles(), style]}>
        <View {...dialogActionsContainerProps}>{children}</View>
      </Box>
    );
  },
);
