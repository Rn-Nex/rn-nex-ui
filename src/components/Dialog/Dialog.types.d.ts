import { BoxProps } from '../Box/Box.types';
import { PortalProps } from '../Portal/Portal.types';
import { TextProps } from '../Typography/Text.types';

export interface DialogTitleProps extends TextProps {}

export interface DialogProps extends PortalProps {
  dialogContainerProps?: Omit<BoxProps, 'children'>;
}

export interface DialogActionsProps extends BoxProps {
  dialogActionsContainerProps?: Omit<BoxProps, 'children'>;
}
