import React from 'react';
import { View } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { TextProps } from '../Typography/TextTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { BoxProps } from '../Box/BoxTypes';

/**
 * Interface for the List component properties, extending the properties of a View component
 */
export interface ListProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Optional custom styles for the List component
   */
  sx?: BaseStyles;
  /**
   * The content of the subheader, normally ListSubheader.
   */
  subheader?: string | number;

  subheaderContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  subheaderProps?: Omit<TextProps, 'children'>;

  /**
   * If true, vertical padding is removed from the list.
   */
  disablePadding?: boolean;
}

/**
 * Interface for the ListItem component properties, extending from BaseButtonProps
 */
export interface ListItemProps extends BaseButtonProps {
  /**
   * Optional styles for the container of the ListItem
   */
  listContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;
  /**
   * Optional element to be displayed at the end of the ListItem
   */
  endAdornment?: React.ReactNode;
  /**
   * Optional styles for the container of the endAdornment
   */
  endAdornmentContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;
  /**
   * Use to apply selected styling.
   */
  selected?: boolean;
}

/**
 * Interface for ListItemIcon component properties, extending the properties of ListProps
 */
export interface ListItemIconProps extends ListProps {}

/**
 * Interface for ListItemText component properties, extending ListProps but omitting the 'children' property
 */
export interface ListItemTextProps extends Omit<ListProps, 'children'> {
  /**
   * Optional primary text for the ListItemText component
   */
  primary?: string;
  /**
   * Optional properties for the primary text label
   */
  primaryLabelProps?: Omit<TextProps, 'children'>;
  /**
   *  Optional secondary text for the ListItemText component
   */
  secondary?: string;
  /**
   *  Optional properties for the secondary text label
   */
  secondaryLabelProps?: Omit<TextProps, 'children'>;
  /**
   * Optional flag to disable padding for the ListItemText component
   */
  disablePadding?: boolean;
  alignItems?: 'start' | 'middle' | 'end';
}

/**
 * Interface for styles related to ListItemText component, focusing on the disablePadding property
 */
export interface ListItemTextStylesProps extends Pick<ListItemTextProps, 'disablePadding' | 'alignItems'> {}

/**
 * Interface for styles related to ListItem component, focusing on the endAdornment property
 */
export interface ListItemStylesProps extends Pick<ListItemProps, 'endAdornment'> {}

export interface ListItemContainerStylesProps extends Pick<ListItemProps, 'selected'> {}
export interface ListStylesProps extends Pick<ListProps, 'disablePadding'> {}
