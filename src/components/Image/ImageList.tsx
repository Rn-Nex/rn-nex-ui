import React, { useMemo } from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { generateElementStyles } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Typography';
import { ImageListItemBarProps, ImageListItemProps, ImageListProps } from './ImageTypes';

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

export const ImageListItem = React.forwardRef<View, ImageListItemProps>(({ style, items = 3, ...props }, ref) => {
  const imageListItemStyles = useMemo(() => {
    const baseStyle: ViewStyle = {
      width: `${100 / items}%`,
      alignItems: 'center',
      justifyContent: 'center',
    };

    return baseStyle;
  }, [items]);

  return <Box style={[style, imageListItemStyles]} {...props} ref={ref} />;
});

export const ImageListItemBar: React.FC<ImageListItemBarProps> = ({
  sx,
  listContentWrapperStyles,
  style,
  title,
  titleProps,
  subtitle,
  subtitleProps,
  endAdornment,
  endAdornmentContainerStyles,
  ...props
}) => {
  const imageListBarStyle = useMemo(() => {
    let baseStyle: ViewStyle = {
      width: '100%',
      padding: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.431)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    };

    if (sx) {
      baseStyle = { ...baseStyle, ...generateElementStyles(sx) };
    }

    return baseStyle;
  }, [sx]);

  const adornmentStyles = useMemo(() => {
    const baseStyles: ViewStyle = {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return baseStyles;
  }, []);

  return (
    <Box style={[style, imageListBarStyle]} {...props}>
      <Box style={{ width: endAdornment ? '80%' : '100%', ...listContentWrapperStyles }}>
        {title && (
          <Text variation="h4" mode="light" {...titleProps}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variation="h5" mode="light" {...subtitleProps}>
            {subtitle}
          </Text>
        )}
      </Box>
      {endAdornment && (
        <Box sx={endAdornmentContainerStyles?.sx} style={[adornmentStyles, endAdornmentContainerStyles?.style]}>
          {endAdornment}
        </Box>
      )}
    </Box>
  );
};
