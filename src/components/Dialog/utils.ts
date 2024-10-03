import { TextStyle, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';

export const dialogStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  };
  return styles;
};

export const dialogContainerStyles = (theme: ThemeType): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: theme.colors.grey[800],
    maxWidth: '90%',
    paddingBottom: 8,
    borderRadius: 5,
    elevation: 5,
    zIndex: 100,
  };
  return styles;
};

export const dialogTitleStyles = (theme: ThemeType): TextStyle => {
  const styles: TextStyle = {
    padding: 15,
    color: theme.colors.grey[100],
  };
  return styles;
};

export const DialogContentTextStyles = (theme: ThemeType): TextStyle => {
  const baseStyles: TextStyle = {
    color: theme.colors.grey[100],
  };
  return baseStyles;
};

export const dialogContentStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  };
  return styles;
};

export const dialogActionsStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  return styles;
};
