import { StyleSheet, ViewStyle } from 'react-native';
import { ListItemContainerStylesProps, ListItemTextStylesProps, ListStylesProps } from './List.types';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  baseButton: { display: 'flex', flexDirection: 'row', minHeight: 50, flex: 1 },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  listItemIcon: { padding: 5, minWidth: '15%', minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' },
});

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

export const listItemContainerStyles = ({ selected, theme, selectedColor }: ListItemContainerStylesProps): ViewStyle => {
  const styles: ViewStyle = {
    backgroundColor: selected ? selectedColor || theme.colors.grey[500] : 'transparent',
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
