import { ViewStyle, Dimensions, StyleSheet } from 'react-native';
import { DialogContainerStylesProps, MenuItemContainerStylesProps, MenuItemStylesProps, MenuListStylesProps } from './Menu.types';

const OFFSET = 10;
const WRAPPER_DEFAULT_HEIGHT = 100;
const WRAPPER_BOTTOM_OFFSET = 50;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  menuModal: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  menuList: {
    borderWidth: 0.8,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    elevation: 5,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuItem: {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: 40,
  },
  endAdornment: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const dialogContainerStyles = ({ rootElementRect, wrapperComponentRect }: DialogContainerStylesProps): ViewStyle => {
  if (!rootElementRect) {
    return {};
  }

  const { height: elemHeight, pageY } = rootElementRect;
  const wrapperComponentHeight = wrapperComponentRect?.height || WRAPPER_DEFAULT_HEIGHT;

  const topPos =
    screenHeight <= pageY + wrapperComponentHeight + WRAPPER_BOTTOM_OFFSET
      ? pageY - elemHeight - OFFSET
      : pageY + elemHeight - OFFSET;

  const styles: ViewStyle = {
    maxWidth: '90%',
    position: 'absolute',
    top: topPos,
    right: 20,
  };
  return styles;
};

export const menuListStyles = ({ theme }: MenuListStylesProps): ViewStyle => {
  const baseStyles: ViewStyle = {
    backgroundColor: theme.colors.grey[200],
    borderColor: theme.colors.grey[300],
    shadowColor: theme.colors.grey[300],
  };
  return baseStyles;
};

export const menuItemStyles = ({ endAdornment }: MenuItemStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    minWidth: endAdornment ? '80%' : '100%',
  };
  return styles;
};

export const menuItemContainerStyles = ({ selected, theme, disabled }: MenuItemContainerStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: selected ? theme.colors.grey[500] : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };
  return styles;
};
