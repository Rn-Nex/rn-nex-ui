import { StyleSheet } from 'react-native';
import { green, grey } from '../../libraries';

export const styles = StyleSheet.create({
  snackbarRootContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10000,
  },
  snackbar: {
    width: '100%',
    minHeight: 50,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: grey[900],
  },
  snackbarLabelWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  adornment: {
    paddingLeft: 14,
  },
  snackbarLabelContainer: {
    flex: 1,
    height: '100%',
    display: 'flex',
    paddingHorizontal: 20,
  },
  snackbarOptionContainer: { flex: 0.4 },
  buttonLabel: { color: green[500], fontWeight: 600 },
});
