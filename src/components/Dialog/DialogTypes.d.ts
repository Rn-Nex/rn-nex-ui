import { BoxProps } from '../Box/BoxTypes';
import { PortalProps } from '../Portal/PortalTypes';
import { TextProps } from '../Typography/TextTypes';

export interface DialogTitleProps extends TextProps {}

export interface DialogProps extends PortalProps {
  dialogContainerProps?: Omit<BoxProps, 'children'>;
}

export interface DialogActionsProps extends BoxProps {
  dialogActionsContainerProps?: Omit<BoxProps, 'children'>;
}
