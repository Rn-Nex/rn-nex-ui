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
    minWidth: '12%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  let styles: ViewStyle = {
    backgroundColor: selected ? selectedColor || theme.colors.grey[500] : showDefaultBg ? theme.colors.grey[50] : 'transparent',
  };

  if (showOutline) {
    styles.borderWidth = outlineWidth || 1;
    styles.borderColor = outlineColor || theme.colors.grey[400];
  }

  if (softRadius) {
    styles.borderRadius = 10;
  }

  return styles;
};

export const listItemTextStyles = ({ disablePadding, alignItems }: ListItemTextStylesProps): ViewStyle => {
  let styles: ViewStyle = {
    display: 'flex',
    flex: 1,
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
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,
    };
  }

  return styles;
};
