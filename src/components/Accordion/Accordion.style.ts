import { StyleSheet } from 'react-native';

export const accordionSummaryStyles = StyleSheet.create({
  accordionSummaryWrapperContainer: {
    padding: 13,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accordionSummaryChildWrapper: {
    width: '90%',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
  },
  startAdornmentContainer: {
    width: '15%',
  },
  accordionSummaryExpandIconWrapper: {
    width: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  accordionDetailsWrapper: {
    width: '100%',
  },
  hiddenView: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
  },
});

export const accordionStyles = StyleSheet.create({
  overLay: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 100,
  },
});
