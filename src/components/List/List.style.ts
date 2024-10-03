import { ViewStyle } from 'react-native';
import { ListItemContainerStylesProps, ListItemStylesProps, ListItemTextStylesProps, ListStylesProps } from './List.types';

export const listStyles = ({ disablePadding }: ListStylesProps): ViewStyle => {
  let styles: ViewStyle = {
    width: '100%',
  };

  if (!disablePadding) {
    return {
      ...styles,
      paddingVertical: 3,
    };
  }
  return styles;
};

export const headerContainerStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  };
  return styles;
};

export const listItemStyles = ({ endAdornment }: ListItemStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    minWidth: endAdornment ? '80%' : '100%',
    minHeight: 50,
  };
  return styles;
};

export const listItemContainerStyles = ({ selected, theme }: ListItemContainerStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: selected ? theme.colors.grey[500] : 'transparent',
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

export const listItemIconStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    padding: 5,
    minWidth: '15%',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return styles;
};

export const listItemTextStyles = ({ disablePadding, alignItems }: ListItemTextStylesProps): ViewStyle => {
  let styles: ViewStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems:
      alignItems === 'start'
        ? 'flex-start'
        : alignItems === 'middle'
        ? 'center'
        : alignItems === 'end'
        ? 'flex-end'
        : 'flex-start',
  };

  if (!disablePadding) {
    return {
      ...styles,
      paddingHorizontal: 15,
      paddingVertical: 5,
    };
  }

  return styles;
};
