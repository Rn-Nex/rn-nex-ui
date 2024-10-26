import { StyleSheet } from 'react-native';
import { RADIO_ITEM_CONTAINER_DEFAULT_SIZE, RADIO_PADDING_SPACE_SMALL } from './constants';

export const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOutline: {
    borderRadius: 100,
    borderWidth: 0.8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RADIO_PADDING_SPACE_SMALL,
  },
  radioCircle: {
    borderRadius: 100,
  },
  radioItemContainer: {
    minWidth: RADIO_ITEM_CONTAINER_DEFAULT_SIZE,
    minHeight: RADIO_ITEM_CONTAINER_DEFAULT_SIZE,
  },
});
