import { ViewStyle, Dimensions } from 'react-native';
import { DialogContainerStylesProps, MenuItemContainerStylesProps, MenuItemStylesProps, MenuListStylesProps } from './MenuTypes';

const OFFSET = 10;
const WRAPPER_DEFAULT_HEIGHT = 100;
const WRAPPER_BOTTOM_OFFSET = 50;
const screenHeight = Dimensions.get('window').height;

export const menuStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: 'transparent',
    flex: 1,
  };
  return styles;
};

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
    backgroundColor: theme.colors.grey[700],
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    elevation: 5,
    shadowColor: theme.colors.grey[500],
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  };
  return baseStyles;
};

export const menuItemStyles = ({ endAdornment }: MenuItemStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    minWidth: endAdornment ? '80%' : '100%',
    minHeight: 40,
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

export const endAdornmentStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return styles;
};
