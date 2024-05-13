import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { ElementBorderRadiusMap, ElementSpacingMap } from '../../libraries/style/styleTypes';

export interface BoxProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: ElementSpacingMap & ElementBorderRadiusMap;
  children?: React.ReactNode;
}
