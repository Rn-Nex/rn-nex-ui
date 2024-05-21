import React from 'react';
import { View } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { TextProps } from '../Typography/TextTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';
import { BoxProps } from '../Box/BoxTypes';
import { ThemeType } from '../../libraries/themes/v1/theme';

/**
 * Interface for the List component properties, extending the properties of a View component
 * This interface defines the props that can be passed to a List component.
 */
export interface ListProps extends React.ComponentPropsWithRef<typeof View> {
  /**
   * Optional custom styles for the List component.
   * This can be used to apply additional styling to the List component.
   */
  sx?: BaseStyles;

  /**
   * The content of the subheader, normally ListSubheader.
   * This property allows you to set a subheader for the List.
   * It can be a string or a number.
   */
  subheader?: string | number;

  /**
   * Styles for the container of the subheader.
   * This property can be used to style the box containing the subheader.
   */
  subheaderContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  /**
   * Properties for the subheader text component.
   * This allows customization of the subheader text properties, excluding the children prop.
   */
  subheaderProps?: Omit<TextProps, 'children'>;

  /**
   * If true, vertical padding is removed from the list.
   * This property is useful to adjust the spacing within the List component.
   */
  disablePadding?: boolean;
}

/**
 * Interface for the ListItem component properties, extending from BaseButtonProps
 * This interface defines the props that can be passed to a ListItem component.
 */
export interface ListItemProps extends BaseButtonProps {
  /**
   * Optional styles for the container of the ListItem.
   * This can be used to apply additional styling to the ListItem container.
   */
  listContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  /**
   * Optional element to be displayed at the end of the ListItem.
   * This property allows adding a custom element, such as an icon, at the end of the ListItem.
   */
  endAdornment?: React.ReactNode;

  /**
   * Optional styles for the container of the endAdornment.
   * This can be used to apply additional styling to the container of the endAdornment.
   */
  endAdornmentContainerStyles?: Pick<BoxProps, 'style' | 'sx'>;

  /**
   * Use to apply selected styling.
   * This property indicates if the ListItem is selected, allowing you to apply selected styles.
   */
  selected?: boolean;
}

/**
 * Interface for ListItemIcon component properties, extending the properties of ListProps
 * This interface defines the props that can be passed to a ListItemIcon component.
 */
export interface ListItemIconProps extends ListProps {}

/**
 * Interface for ListItemText component properties, extending ListProps but omitting the 'children' property
 * This interface defines the props that can be passed to a ListItemText component.
 */
export interface ListItemTextProps extends Omit<ListProps, 'children'> {
  /**
   * Optional primary text for the ListItemText component.
   * This property allows you to set the main text for the ListItemText component.
   */
  primary?: string;

  /**
   * Optional properties for the primary text label.
   * This allows customization of the primary text label properties, excluding the children prop.
   */
  primaryLabelProps?: Omit<TextProps, 'children'>;

  /**
   * Optional secondary text for the ListItemText component.
   * This property allows you to set additional text for the ListItemText component.
   */
  secondary?: string;

  /**
   * Optional properties for the secondary text label.
   * This allows customization of the secondary text label properties, excluding the children prop.
   */
  secondaryLabelProps?: Omit<TextProps, 'children'>;

  /**
   * Optional flag to disable padding for the ListItemText component.
   * This property can be used to remove padding from the ListItemText component.
   */
  disablePadding?: boolean;

  /**
   * Alignment of the items within the ListItemText component.
   * This property allows you to align the items to the start, middle, or end.
   */
  alignItems?: 'start' | 'middle' | 'end';
}

/**
 * Interface for styles related to ListItemText component, focusing on the disablePadding property
 * This interface defines styles specific to the ListItemText component.
 */
export interface ListItemTextStylesProps extends Pick<ListItemTextProps, 'disablePadding' | 'alignItems'> {}

/**
 * Interface for styles related to ListItem component, focusing on the endAdornment property
 * This interface defines styles specific to the ListItem component.
 */
export interface ListItemStylesProps extends Pick<ListItemProps, 'endAdornment'> {}

/**
 * Interface for styles related to the ListItem container, focusing on the selected property
 * This interface defines styles specific to the ListItem container.
 */
export interface ListItemContainerStylesProps extends Pick<ListItemProps, 'selected'> {
  theme: ThemeType;
}

/**
 * Interface for styles related to the List component, focusing on the disablePadding property
 * This interface defines styles specific to the List component.
 */
export interface ListStylesProps extends Pick<ListProps, 'disablePadding'> {}
