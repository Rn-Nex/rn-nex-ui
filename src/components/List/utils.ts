import { ViewStyle } from 'react-native';
import { ListItemTextStylesProps } from './ListTypes';

export const listStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    width: '100%',
    paddingVertical: 3,
  };

  return styles;
};

export const listItemStyles = (): ViewStyle => {
  const styles: ViewStyle = {
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
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

export const listItemTextStyles = ({ disablePadding }: ListItemTextStylesProps): ViewStyle => {
  let styles: ViewStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  };

  if (!disablePadding) {
    return {
      ...styles,
      paddingHorizontal: 23,
      paddingVertical: 5,
    };
  }

  return styles;
};
