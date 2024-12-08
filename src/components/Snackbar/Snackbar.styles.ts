import { DimensionValue, StyleSheet, ViewStyle } from 'react-native';
import { green, grey } from '../../libraries';
import { getVariant, isAndroid, isIso, isLargeScreen } from '../../utils';
import { SnackbarContainerStylesInterface, SnackbarRootContainerStylesInterface } from './Snackbar';

export const styles = StyleSheet.create({
  snackbarRootContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 9999,
    elevation: 1000,
  },
  snackbar: {
    minHeight: 50,
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
    left: 0,
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

export const snackbarRootContainerStyle = ({
  horizontal,
  opacityValue,
  translateY,
}: SnackbarRootContainerStylesInterface): ViewStyle => {
  const isLeftPosition = horizontal === 'left';
  let width: DimensionValue;

  if (isLargeScreen && isIso) {
    width = '40%';
  } else if (isLargeScreen && isAndroid) {
    width = '30%';
  } else {
    width = '100%';
  }

  return {
    width,
    opacity: opacityValue,
    transform: [{ translateY }],
    ...(isLeftPosition && { left: 0 }),
    ...(!isLeftPosition && { right: 0 }),
  };
};

export const snackbarContainerStyles = ({ colors, variant }: SnackbarContainerStylesInterface): ViewStyle => {
  return {
    backgroundColor: variant ? getVariant({ variant: variant, colors }) : grey[900],
  };
};
