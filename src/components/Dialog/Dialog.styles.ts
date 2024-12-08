import { DimensionValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme } from '../../libraries/themes/v1/theme';
import { DialogActionsContainerStylesInterface, DialogContainerStylesInterface } from './Dialog.types';

export const styles = StyleSheet.create({
  dialogRootContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContainer: {
    paddingBottom: 8,
    borderRadius: 5,
    elevation: 5,
    zIndex: 100,
  },
  dialogContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  dialogActions: {
    paddingTop: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  dialogActionsContainer: {
    minWidth: 100,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
});

export const dialogContainerStyles = ({ colors, fullWidth, maxWidth }: DialogContainerStylesInterface): ViewStyle => {
  let width: DimensionValue;

  switch (maxWidth) {
    case 'xs':
      width = '25%';
      break;
    case 'sm':
      width = '35%';
      break;
    case 'md':
      width = '50%';
      break;
    case 'lg':
      width = '70%';
      break;
    case 'xl':
      width = '85%';
      break;
    default:
      width = '90%';
  }

  const mW = fullWidth ? '100%' : width;

  return {
    backgroundColor: colors.grey[800],
    maxWidth: mW,
  };
};

export const dialogTitleStyles = (colors: Theme): TextStyle => ({
  padding: 15,
  color: colors.grey[100],
});

export const dialogContentTextStyles = (colors: Theme): TextStyle => ({
  color: colors.grey[100],
});

export const dialogActionsContainerStyles = ({ maxWidth, fullWidth }: DialogActionsContainerStylesInterface): ViewStyle => ({
  maxWidth: fullWidth ? '100%' : maxWidth,
});
