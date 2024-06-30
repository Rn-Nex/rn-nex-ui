import React, { useMemo } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { ImageListProps } from './ImageTypes';

export const ImageList: React.FC<ImageListProps> = ({ style, children, contentContainerStyle, ...props }) => {
  const scrollViewStyles = useMemo(() => {
    const baseStyles: ViewStyle = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    };
    return baseStyles;
  }, []);

  return (
    <ScrollView style={[style]} contentContainerStyle={[scrollViewStyles, contentContainerStyle]} {...props}>
      {children}
    </ScrollView>
  );
};
