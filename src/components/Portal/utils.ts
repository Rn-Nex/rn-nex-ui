import { ViewStyle } from 'react-native';

export const createModalBackgroundStyles = (): ViewStyle => {
  const baseStyles: ViewStyle = {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  };

  return baseStyles;
};
