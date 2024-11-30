import { StyleSheet, ViewStyle } from 'react-native';
import { ListItemContainerStylesProps, ListItemTextStylesProps, ListStylesProps } from './List.types';

export const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  listItemInnerContainer: { flex: 1 },
  headerContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  baseButton: { display: 'flex', flexDirection: 'row', minHeight: 50 },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  adornment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    minWidth: '15%',
  },
  listItemIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  listItemText: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
});

export const listStyles = ({ disablePadding }: ListStylesProps): ViewStyle => {
  let styles: ViewStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  if (!disablePadding) {
    return {
      ...styles,
      paddingVertical: 3,
    };
  }
  return styles;
};

export const listItemContainerStyles = ({
  selected,
  theme,
  selectedColor,
  showOutline,
  outlineWidth,
  outlineColor,
  showDefaultBg,
  softRadius,
}: ListItemContainerStylesProps): ViewStyle => {
  const defaultBgColor = theme.colors.grey[50];
  const selectedBgColor = selectedColor || theme.colors.grey[100];

  let styles: ViewStyle = {
    backgroundColor: selected ? selectedBgColor : showDefaultBg ? defaultBgColor : 'transparent',
  };

  if (showOutline) {
    styles.borderWidth = outlineWidth ?? 1;
    styles.borderColor = outlineColor ?? theme.colors.grey[400];
  }

  if (softRadius) {
    styles.borderRadius = 10;
  }

  return styles;
};

export const listItemTextStyles = ({ disablePadding, alignItems, disableLeftPadding }: ListItemTextStylesProps): ViewStyle => {
  let alignItemsStyle: ViewStyle['alignItems'];

  switch (alignItems) {
    case 'start':
      alignItemsStyle = 'flex-start';
      break;
    case 'middle':
      alignItemsStyle = 'center';
      break;
    case 'end':
      alignItemsStyle = 'flex-end';
      break;
    default:
      alignItemsStyle = 'flex-start';
      break;
  }

  let styles: ViewStyle = {
    alignItems: alignItemsStyle,
  };

  if (!disablePadding) {
    return {
      ...styles,
      ...(!disableLeftPadding && { paddingLeft: 15 }),
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
    };
  }

  return styles;
};
