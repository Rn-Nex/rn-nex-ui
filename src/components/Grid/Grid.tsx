import React, { forwardRef, useCallback } from 'react';
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { gridContainerStyles, gridItemContainerStyles, styles } from './Grid.styles';

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export interface GridProps extends BoxProps {
  width?: DimensionValue;
  spacing?: number;
}
export interface GridContainerStylesInterface extends Pick<GridProps, 'width'> {}
export interface GridItemProps extends BoxProps {
  size?: GridSize;
  gridInnerContainerStyles?: StyleProp<ViewStyle>;
  leftSpacing?: DimensionValue;
  rightSpacing?: DimensionValue;
  topSpacing?: DimensionValue;
  bottomSpacing?: DimensionValue;
}
export interface GridItemContainerStylesInterface
  extends Pick<GridItemProps, 'size' | 'leftSpacing' | 'rightSpacing' | 'topSpacing' | 'bottomSpacing'> {}

export const Grid = forwardRef<View, GridProps>(({ sx, style, width, children, spacing = 0, ...props }, ref) => {
  const totalColumns = 12;
  let currentRowTotalSize = 0;
  let currentRowIndex = 1;

  const renderChild = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      const size = child.props.size || 1;

      const isFirstInRow = currentRowTotalSize === 0;
      currentRowTotalSize += size;
      const isLastInRow = currentRowTotalSize === totalColumns;

      console.log({ currentRowIndex });

      if (currentRowTotalSize >= totalColumns) {
        currentRowTotalSize = 0;
        currentRowIndex += 1;
      }

      const halfSpacing = spacing / 2;

      const childProps: GridItemProps = {
        ...(isFirstInRow && { rightSpacing: halfSpacing }),
        ...(!isFirstInRow && !isLastInRow && { leftSpacing: halfSpacing, rightSpacing: halfSpacing }),
        ...(isLastInRow && { leftSpacing: halfSpacing }),
      };

      return React.cloneElement<any>(child, { ...childProps, ...child.props });
    });
  }, [children, spacing]);

  return (
    <Box ref={ref} sx={sx} style={StyleSheet.flatten([styles.gridContainer, gridContainerStyles({ width }), style])} {...props}>
      {renderChild()}
    </Box>
  );
});

export const GridItem = forwardRef<View, GridItemProps>(
  (
    {
      children,
      gridInnerContainerStyles,
      style,
      leftSpacing = 0,
      rightSpacing = 0,
      topSpacing = 0,
      bottomSpacing = 0,
      size = 1,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        ref={ref}
        style={StyleSheet.flatten([
          gridItemContainerStyles({ size, topSpacing, bottomSpacing, leftSpacing, rightSpacing }),
          style,
        ])}
        {...props}>
        <Box style={StyleSheet.flatten([styles.gridItemInnerContainer, gridInnerContainerStyles])}>{children}</Box>
      </Box>
    );
  },
);
