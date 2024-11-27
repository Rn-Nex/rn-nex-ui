import { StyleSheet } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';

export const styles = StyleSheet.create({
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  horizontalLine: {
    width: 15,
    height: 2.4,
    borderRadius: 2,
    position: 'absolute',
  },
  verticalLine: {
    width: 2.4,
    height: 15,
    borderRadius: 2,
    position: 'absolute',
  },
  item: {
    minWidth: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperOptions: {
    borderWidth: 2,
  },
});

export const iconStyle = (theme: ThemeType) => {
  return { backgroundColor: theme.colors.grey[800] };
};
