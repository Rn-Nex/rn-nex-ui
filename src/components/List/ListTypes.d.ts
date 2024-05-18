import React from 'react';
import { View } from 'react-native';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { TextProps } from '../Typography/TextTypes';
import { BaseButtonProps } from '../Button/ButtonTypes';

export interface ListProps extends React.ComponentPropsWithRef<typeof View> {
  sx?: BaseStyles;
}
export interface ListItemProps extends BaseButtonProps {}
export interface ListItemIconProps extends ListProps {}
export interface ListItemTextProps extends Omit<ListProps, 'children'> {
  primary?: string;
  primaryLabelProps?: Omit<TextProps, 'children'>;
  secondary?: string;
  secondaryLabelProps?: Omit<TextProps, 'children'>;
  disablePadding?: boolean;
}
export interface ListItemTextStylesProps extends Pick<ListItemTextProps, 'disablePadding'> {}
