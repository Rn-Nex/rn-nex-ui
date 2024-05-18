import React from 'react';
import { LayoutRectangle, View, ViewProps } from 'react-native';

export type DividerVariants = 'fullWidth' | 'inset' | 'middle';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerChildAlignment = 'left' | 'right' | 'center';

export interface DividerProps extends React.ComponentPropsWithoutRef<typeof View> {
  variant?: DividerVariants;
  textAlign?: DividerChildAlignment;
}
export interface DividerRootContainerProps extends ViewProps, Pick<DividerProps, 'variant'> {}
export interface GenerateDividerStylesProps extends Pick<DividerProps, 'variant' | 'textAlign'> {
  dividerType: 'left' | 'right';
  childWrapperLayoutRect?: LayoutRectangle;
  hasChild?: boolean;
  dividerRootLayoutRect?: LayoutRectangle;
}
