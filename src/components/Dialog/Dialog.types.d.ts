import { ViewStyle } from 'react-native';
import { Theme } from '../../libraries/themes/v1/theme';
import { BoxProps } from '../Box/Box.types';
import { PortalProps } from '../Portal/Portal.types';
import { TextProps } from '../types';

export interface DialogTitleProps extends TextProps {}
export interface DialogProps extends PortalProps {
  dialogContainerProps?: Omit<BoxProps, 'children'>;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export interface DialogContainerStylesInterface extends Pick<DialogProps, 'fullWidth' | 'maxWidth'> {
  colors: Theme;
}
export interface DialogActionsProps extends BoxProps {
  dialogActionsContainerStyles?: ViewStyle;
  maxWidth?: number;
  fullWidth?: boolean;
}
export interface DialogActionsContainerStylesInterface extends Pick<DialogActionsProps, 'maxWidth' | 'fullWidth'> {}
