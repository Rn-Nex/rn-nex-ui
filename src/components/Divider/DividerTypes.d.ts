import React from 'react';
import { LayoutRectangle, View, ViewProps } from 'react-native';

export type DividerVariants = 'fullWidth' | 'inset' | 'middle';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerChildAlignment = 'left' | 'right' | 'center';

export interface DividerProps extends React.ComponentPropsWithoutRef<typeof View> {
  variant?: DividerVariants;
  textAlign?: DividerChildAlignment;
  orientation?: DividerOrientation;
}
export interface DividerRootContainerProps extends ViewProps, Pick<DividerProps, 'variant' | 'orientation'> {}
export interface GenerateDividerStylesProps extends Pick<DividerProps, 'variant' | 'textAlign' | 'orientation'> {
  dividerType: 'left' | 'right';
  childWrapperLayoutRect?: LayoutRectangle;
  hasChild?: boolean;
  dividerRootLayoutRect?: LayoutRectangle;
}
