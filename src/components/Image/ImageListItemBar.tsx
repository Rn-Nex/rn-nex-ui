import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { generateElementStyles } from '../../utils';
import { Box } from '../Box';
import { Text } from '../Typography';
import { ImageListItemBarProps } from './Image.types';

export const ImageListItemBar = React.forwardRef<View, ImageListItemBarProps>(
  (
    {
      sx,
      listContentWrapperStyles,
      style,
      title,
      titleProps,
      subtitle,
      subtitleProps,
      endAdornment,
      endAdornmentContainerStyles,
      overlayColor,
      position = 'bottom',
      ...props
    },
    ref,
  ) => {
    const imageListBarStyle = useMemo(() => {
      const elmPos: { bottom?: number; top?: number } = {};

      if (position === 'bottom') {
        elmPos.bottom = 0;
      } else if (position === 'top') {
        elmPos.top = 0;
      }

      let baseStyle: ViewStyle = {
        width: '100%',
        padding: 10,
        position: 'absolute',
        ...elmPos,
        left: 0,
        backgroundColor: overlayColor ?? 'rgba(0, 0, 0, 0.431)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      };

      if (sx) {
        baseStyle = { ...baseStyle, ...generateElementStyles(sx) };
      }

      return baseStyle;
    }, [sx, position, overlayColor]);

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
      <Box style={[style, imageListBarStyle]} ref={ref} {...props}>
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
  },
);
