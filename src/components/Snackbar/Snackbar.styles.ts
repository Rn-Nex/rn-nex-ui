import { StyleSheet } from 'react-native';
import { green } from '../../libraries';

export const styles = StyleSheet.create({
  snackbarRootContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 1000,
  },
  snackbar: {
    width: '100%',
    minHeight: 50,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  snackbarLabelWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  adornment: {
    paddingLeft: 14,
  },
  snackbarLabelContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  snackbarOptionContainer: {
    flex: 0.3,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: { color: green[500], fontWeight: 600, fontSize: 14 },
  actionButton: { width: '100%', borderRadius: 0, height: '100%' },
  icon: {
    width: 20,
    height: 20,
  },
});
