import React from 'react';
import { View, ViewStyle } from 'react-native';
import {
   ElementBorderRadiusMap,
   ElementSpacingMap,
} from '../../libraries/style/styleTypes';

export interface BoxProps
   extends React.ComponentPropsWithRef<typeof View>,
      ElementSpacingMap,
      ElementBorderRadiusMap,
      ViewStyle {
   children?: React.ReactNode;
}
