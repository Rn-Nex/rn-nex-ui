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
