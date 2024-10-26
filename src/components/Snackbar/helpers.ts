import { DeviceEventEmitter } from 'react-native';
import { SHOW_SNACK_BAR_MESSAGE } from './constants';
import { SnackbarProperties } from './Snackbar';

export const snackbar = {
  info: (config: SnackbarProperties) => {
    DeviceEventEmitter.emit(SHOW_SNACK_BAR_MESSAGE, config);
  },
  success: (config: SnackbarProperties) => {
    DeviceEventEmitter.emit(SHOW_SNACK_BAR_MESSAGE, config);
  },
  danger: (config: SnackbarProperties) => {
    DeviceEventEmitter.emit(SHOW_SNACK_BAR_MESSAGE, config);
  },
};
