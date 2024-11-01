import React, { useMemo } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { ImageListProps } from './Image.types';

export const ImageList = React.forwardRef<ScrollView, ImageListProps>(
  ({ style, children, contentContainerStyle, ...props }, ref) => {
    const scrollViewStyles = useMemo(() => {
      const baseStyles: ViewStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      };
      return baseStyles;
    }, []);

    return (
      <ScrollView style={[style]} contentContainerStyle={[scrollViewStyles, contentContainerStyle]} ref={ref} {...props}>
        {children}
      </ScrollView>
    );
  },
);
