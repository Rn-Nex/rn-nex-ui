import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  listContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    height: 0,
  },
  listContainerScrollView: {
    flex: 1,
    paddingVertical: 2,
  },
});
