import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { DialogContainerStylesProps, MenuItemContainerStylesProps, MenuListStylesProps } from './Menu.types';

const OFFSET = 10;
const WRAPPER_DEFAULT_HEIGHT = 100;
const WRAPPER_BOTTOM_OFFSET = 50;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  menuList: {
    borderWidth: 0.8,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    width: '100%',
  },
  menuContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  menuItemInnerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  menuItemBaseButtonContainer: {
    flex: 1,
  },
  baseButton: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 2,
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuModal: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  menuItem: {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
  },
});

export const menuListStyles = ({ theme }: MenuListStylesProps): ViewStyle => ({
  backgroundColor: theme.colors.grey[200],
  borderColor: theme.colors.grey[300],
  shadowColor: theme.colors.grey[300],
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

export const menuItemContainerStyles = ({ selected, theme, disabled }: MenuItemContainerStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: selected ? theme.colors.grey[500] : 'transparent',
    opacity: disabled ? 0.5 : 1,
  };
  return styles;
};
