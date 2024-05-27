import React, { useMemo, useState } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Box } from '../Box';
import { PaginationItem } from './PaginationItem';
import { PaginationProps } from './PaginationTypes';
import { paginationStyles } from './utils';

export const Pagination = React.forwardRef<View, PaginationProps>(({ count, onPageChange, ...props }, ref) => {
  const [activeCount, setActiveCount] = useState<number>(1);

  const items = useMemo(() => Array.from({ length: count }, (_, index) => index + 1), [count]);

  const pageChangeHandler = (event: GestureResponderEvent, page: number) => {
    setActiveCount(page);
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(event, page);
    }
  };

  return (
    <Box ref={ref} style={[paginationStyles()]} {...props}>
      {items.map((item, index) => (
        <PaginationItem
          key={`pagination_${item}_${index}`}
          onPress={event => pageChangeHandler(event, item)}
          page={item}
          active={activeCount === item}
        />
      ))}
    </Box>
  );
});
