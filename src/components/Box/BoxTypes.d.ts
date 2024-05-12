import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { ElementBorderRadiusMap, ElementSpacingMap } from '../../libraries/style/styleTypes';

export interface BoxProps extends ViewProps {
  style?: ElementSpacingMap & ElementBorderRadiusMap & ViewStyle;
  children?: React.ReactNode;
}
