import { ViewStyle } from 'react-native';
import { colors } from '../../libraries';

export const dialogStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  };
  return styles;
};

export const dialogContainerStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: colors.tertiary.dark,
    maxWidth: '90%',
    paddingBottom: 8,
    borderRadius: 5,
    elevation: 5,
    shadowColor: colors.black.light,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  };
  return styles;
};

export const dialogTitleStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    padding: 15,
  };
  return styles;
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
