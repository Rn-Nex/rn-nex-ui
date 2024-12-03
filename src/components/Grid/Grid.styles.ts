import { DimensionValue, StyleSheet, ViewStyle } from 'react-native';
import { GridContainerStylesInterface, GridItemContainerStylesInterface } from './Grid';

export const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const gridContainerStyles = ({ width }: GridContainerStylesInterface): ViewStyle => {
  return { width };
};

export const gridItemContainerStyles = ({
  size,
  topSpacing,
  leftSpacing,
  rightSpacing,
  bottomSpacing,
}: GridItemContainerStylesInterface): ViewStyle => {
  const calculateWidth: DimensionValue = !!size && size > 0 ? `${(size / 12) * 100}%` : 'auto';
  return {
    width: calculateWidth,
    ...(topSpacing && { marginTop: topSpacing }),
    ...(bottomSpacing && { paddingBottom: bottomSpacing }),
    ...(leftSpacing && { paddingLeft: leftSpacing }),
    ...(rightSpacing && { paddingRight: rightSpacing }),
  };
};