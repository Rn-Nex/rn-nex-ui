import React from 'react';
import { View } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';

export interface BoxProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: BaseStyles;
  children?: React.ReactNode;
}
