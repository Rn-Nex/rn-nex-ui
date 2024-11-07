import React from 'react';
import { LayoutRectangle, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { MeasureElementRect } from '../../types';
import { BoxProps } from '../Box/Box.types';
import { BaseButtonProps } from '../Button/Button.types';
import { PortalProps } from '../Portal/Portal.types';

export interface MenuItemProps extends BaseButtonProps {
  /** Element to be displayed at the end of the menu item, e.g., an icon. */
  adornment?: React.ReactNode;
  /** Styles for the container of the end adornment */
  adornmentContainerStyles?: ViewStyle;
  /** Indicates if the menu item is selected. */
  selected?: boolean;
  adornmentType?: 'start' | 'end';
  actionType?: 'root' | 'element';
  adornmentMinWidth?: number;
}

export interface MenuItemContainerStylesProps extends Pick<MenuItemProps, 'selected'> {
  /** The theme object, which contains theme-related properties and methods. */
  theme: ThemeType;
  /** Indicates if the menu item is disabled. */
  disabled?: boolean;
}

export interface MenuListStylesProps {
  /** The theme object, which contains theme-related properties and methods. */
  theme: ThemeType;
}

export interface MenuListProps extends ViewProps {}

export interface MenuProps extends PortalProps {
  /** Indicates if the menu is currently focused. */
  focused?: boolean;
  /** Rect object that contains the dimensions and position of the root element. */
  rootElementRect?: MeasureElementRect | null;
  /** Styles for the container of the menu, using ViewStyle. */
  menuContainerStyles?: StyleProp<ViewStyle>;
  /** Duration of the fade animation in milliseconds. */
  fadeAnimationDuration?: number;
  /** Duration of the scale animation in milliseconds. */
  scaleAnimationDuration?: number;
}

export interface DialogContainerStylesProps extends Pick<MenuProps, 'rootElementRect'> {
  /** Rect object that contains the dimensions and position of the wrapper component. */
  wrapperComponentRect?: LayoutRectangle;
}
