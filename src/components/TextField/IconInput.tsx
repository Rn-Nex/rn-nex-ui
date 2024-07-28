import React, { useMemo } from 'react';
import { TextInputProps, View } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Box } from '../Box';
import { BoxProps } from '../Box/BoxTypes';
import { BaseInput } from './BaseInput';

/**
 * IconInputProps interface extends the properties of a TextInput component
 * to include additional props for customizing the input with adornments
 * and wrapper properties.
 */
export interface IconInputProps extends TextInputProps {
  /**
   * Props to be applied to the wrapper around the TextInput component.
   * This can be used to style and position the input element.
   */
  inputWrapperProps?: BoxProps;

  /**
   * A React node to be displayed at the end of the input field.
   * This is typically used for icons or other interactive elements.
   */
  endAdornment?: React.ReactNode;

  /**
   * Props to be applied to the container of the end adornment.
   * Allows for additional styling and positioning of the end adornment.
   * Note: The `children` prop is omitted as it is handled internally.
   */
  endAdornmentContainerProps?: Omit<BoxProps, 'children'>;

  /**
   * A React node to be displayed at the start of the input field.
   * This is typically used for icons or other interactive elements.
   */
  startAdornment?: React.ReactNode;

  /**
   * Props to be applied to the container of the start adornment.
   * Allows for additional styling and positioning of the start adornment.
   * Note: The `children` prop is omitted as it is handled internally.
   */
  startAdornmentContainerProps?: Omit<BoxProps, 'children'>;
}

export const IconInput: React.FC<IconInputProps> = React.forwardRef<View, IconInputProps>(
  (
    {
      inputWrapperProps,
      endAdornment,
      endAdornmentContainerProps,
      startAdornment,
      startAdornmentContainerProps,
      style,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const defaultInputStyles: BaseStyles = useMemo(() => {
      const styles: BaseStyles = {
        w: '100%',
        bg: theme.colors.grey[300],
        px: 10,
        py: 5,
        r: 6,
        bColor: theme.colors.grey[400],
        bWidth: 1,
        d: 'flex',
        fDirection: 'row',
        items: 'center',
        ...inputWrapperProps?.sx,
      };
      return styles;
    }, [inputWrapperProps?.sx]);

    return (
      <Box sx={defaultInputStyles} {...inputWrapperProps} ref={ref}>
        {startAdornment && (
          <Box style={{ marginRight: 8 }} {...startAdornmentContainerProps}>
            {startAdornment}
          </Box>
        )}
        <BaseInput placeholder="Base input" style={[{ color: '#282828f', flex: 1 }, style]} {...props} />
        {endAdornment && (
          <Box style={{ marginLeft: 8 }} {...endAdornmentContainerProps}>
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  },
);
IconInput.displayName = 'IconInput';
