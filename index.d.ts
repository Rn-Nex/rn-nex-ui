import React from 'react';
import {
  View,
  ActivityIndicator as RnActivityIndicator,
  Image as RnImage,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { AnimatedViewProps } from './src';
import { BoxProps, ContainerProps } from './src/components/Box/BoxTypes';
import { ActivityIndicatorProps } from './src/components/ActivityIndicator/ActivityIndicatorTypes';
import { AvatarProps } from './src/components/Avatar/AvatarTypes';
import { BadgeProps } from './src/components/Badge/BadgeTypes';
import { BaseButtonProps, ButtonProps } from './src/components/Button/ButtonTypes';
import { CardActionProps, CardContentProps, CardHeaderProps, CardMediaProps, CardProps } from './src/components/Card/CardTypes';
import { ChipProps } from './src/components/Chip/ChipTypes';
import { DialogActionsProps, DialogProps } from './src/components/Dialog/DialogTypes';
import { AnimatedTextProps, TextProps } from './src/components/Typography/TextTypes';
import { DividerProps } from './src/components/Divider/DividerTypes';
import { ImageListItemBarProps, ImageListItemProps, ImageListProps, ImageProps } from './src/components/Image/ImageTypes';
import { ListItemIconProps, ListItemProps, ListItemTextProps, ListProps } from './src/components/List/ListTypes';
import { MenuItemProps, MenuListProps, MenuProps } from './src/components/Menu/MenuTypes';
import { PaginationItemProps, PaginationProps } from './src/components/Pagination/PaginationTypes';
import { ModalContainerProps, PortalProps, PortalProviderProps } from './src/components/Portal/PortalTypes';
import { RippleInterface, RippleProps } from './src/components/Ripple/RippleTypes';
import { SnackbarProps } from './src/components/Snackbar/SnackbarTypes';
import { BaseInputProps, InputLabelProps, OutlineProps, TextFieldProps } from './src/components/TextField/InputTypes';

declare module 'rn-nex-ui' {
  export const ActivityIndicator: React.forwardRef<RnActivityIndicator, ActivityIndicatorProps>;
  export const Avatar: React.forwardRef<RnImage, AvatarProps>;
  export const Badge: React.forwardRef<View, BadgeProps>;
  export const Box: React.forwardRef<View, BoxProps>;
  export const AnimatedView: React.forwardRef<View, AnimatedViewProps>;
  export const BaseButton: React.forwardRef<TouchableWithoutFeedback, BaseButtonProps>;
  export const Button: React.forwardRef<TouchableWithoutFeedback, ButtonProps>;
  export const Card: React.forwardRef<View, CardProps>;
  export const CardAction: React.forwardRef<TouchableWithoutFeedback, CardActionProps>;
  export const CardContent: React.forwardRef<View, CardContentProps>;
  export const CardHeader: React.forwardRef<View, CardHeaderProps>;
  export const CardMedia: React.forwardRef<RnImage, CardMediaProps>;
  export const Chip: React.forwardRef<TouchableWithoutFeedback, ChipProps>;
  export const Dialog: React.FC<DialogProps>;
  export const DialogActions: React.forwardRef<View, DialogActionsProps>;
  export const DialogContent: React.forwardRef<View, BoxProps>;
  export const DialogContentText: React.forwardRef<RnText, TextProps>;
  export const Divider: React.FC<DividerProps>;
  export const Image: React.forwardRef<RnImage, ImageProps>;
  export const List: React.forwardRef<View, ListProps>;
  export const ListItem: React.forwardRef<TouchableWithoutFeedback, ListItemProps>;
  export const ListItemIcon: React.forwardRef<View, ListItemIconProps>;
  export const ListItemText: React.forwardRef<View, ListItemTextProps>;
  export const Menu: React.FC<MenuProps>;
  export const MenuItem: React.forwardRef<TouchableWithoutFeedback, MenuItemProps>;
  export const MenuList: React.forwardRef<View, MenuListProps>;
  export const Pagination: React.forwardRef<View, PaginationProps>;
  export const PaginationItem: React.FC<PaginationItemProps>;
  export const ModalContainer: forwardRef<View, ModalContainerProps>;
  export const Portal: React.FC<PortalProps>;
  export const PortalProvider: React.FC<PortalProviderProps>;
  export const Ripple: React.forwardRef<RippleInterface, RippleProps>;
  export const Snackbar: React.FC<SnackbarProps>;
  export const BaseInput: React.forwardRef<TextInput, BaseInputProps>;
  export const InputLabel: React.FC<InputLabelProps>;
  export const Outline: React.forwardRef<View, OutlineProps>;
  export const TextField: React.FC<TextFieldProps>;
  export const AnimatedText: React.forwardRef<Text, AnimatedTextProps>;
  export const FormHelperText: React.forwardRef<RnText, TextProps>;
  export const Text: React.forwardRef<RnText, TextProps>;
  export const Container: React.forwardRef<View, ContainerProps>;
  export const ImageList: React.FC<ImageListProps>;
  export const ImageListItem: React.forwardRef<View, ImageListItemProps>;
  export const ImageListItemBar: React.FC<ImageListItemBarProps>;
}
