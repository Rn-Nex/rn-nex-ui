import React from 'react';
import { View } from 'react-native';
import {
  ELementDimensionMap,
  ElementBorderRadiusMap,
  ElementDimension,
  ElementFlexStyleProps,
  ElementMargin,
  ElementPadding,
  ElementPositionMap,
} from '../../libraries/style/styleTypes';

export interface BoxProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: ELementDimensionMap<ElementPadding | ElementMargin | ElementDimension> &
    ElementBorderRadiusMap &
    ElementPositionMap &
    ElementFlexStyleProps;
  children?: React.ReactNode;
}
