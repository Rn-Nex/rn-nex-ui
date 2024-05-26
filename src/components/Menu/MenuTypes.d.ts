import React from 'react';
import { LayoutRectangle, NativeTouchEvent, StyleProp, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { MeasureElementRect } from '../../types';
import { BoxProps } from '../Box/BoxTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { PortalProps } from '../Portal/PortalTypes';

/**
 * Props for the individual menu item component.
 * Extends BaseButtonProps to include button-related properties.
 */
export interface MenuItemProps extends BaseButtonProps {
  /** Styles for the container of the list item, can use BoxProps style and sx properties. */
  listContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  /** Element to be displayed at the end of the menu item, e.g., an icon. */
  endAdornment?: React.ReactNode;

  /** Styles for the container of the end adornment, can use BoxProps style and sx properties. */
  endAdornmentContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  /** Indicates if the menu item is selected. */
  selected?: boolean;
}

/**
 * Props for styles related to the menu item.
 */
export interface MenuItemStylesProps {
  /** Element to be displayed at the end of the menu item, e.g., an icon. */
  endAdornment?: React.ReactNode;
}

/**
 * Props for the container styles of the menu item.
 */
export interface MenuItemContainerStylesProps extends Pick<MenuItemProps, 'selected'> {
  /** The theme object, which contains theme-related properties and methods. */
  theme: ThemeType;

  /** Indicates if the menu item is disabled. */
  disabled?: boolean;
}

/**
 * Props for styles related to the menu list.
 */
export interface MenuListStylesProps {
  /** The theme object, which contains theme-related properties and methods. */
  theme: ThemeType;
}

/**
 * Props for the menu list component.
 * Extends BoxProps to include box-related properties.
 */
export interface MenuListProps extends BoxProps {}

/**
 * Props for the main menu component.
 * Extends PortalProps to include portal-related properties.
 */
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

/**
 * Props for the dialog container styles.
 */
export interface DialogContainerStylesProps extends Pick<MenuProps, 'rootElementRect'> {
  /** Rect object that contains the dimensions and position of the wrapper component. */
  wrapperComponentRect?: LayoutRectangle;
}
