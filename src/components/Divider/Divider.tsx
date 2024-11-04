import React, { useCallback, useMemo } from 'react';
import { ColorSchemeName, ColorValue, StyleProp, StyleSheet, useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { RequiredTheme } from '../../libraries/themes/v1/theme';
import { dividerLineStyles, dividerRootContainerStyles, styles } from './Divider.styles';

export interface DividerProps extends ViewProps {
  /**
   * Styles for the line at the start of the divider.
   */
  startLineStyles?: StyleProp<ViewStyle>;
  /**
   * Styles for the line at the end of the divider.
   */
  endLineStyles?: StyleProp<ViewStyle>;
  /**
   * Determines the divider's layout behavior.
   * - 'fullWidth': Divider spans the full width of the container.
   * - 'middle': Divider has padding on both sides to center within the container.
   * - 'startSpacing': Divider is aligned to the start with padding at the beginning.
   * - 'endSpacing': Divider is aligned to the end with padding at the end.
   */
  variant?: 'fullWidth' | 'middle' | 'startSpacing' | 'endSpacing';
  /**
   * Orientation of the divider line.
   * - 'vertical': Divider is displayed vertically.
   * - 'horizontal': Divider is displayed horizontally.
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Aligns any element within the divider.
   * - 'left': Aligns element to the left.
   * - 'center': Centers element.
   * - 'right': Aligns element to the right.
   */
  textAlign?: 'left' | 'center' | 'right';
  /**
   * The color of the divider line, defined by a color value.
   */
  borderColor?: ColorValue;
  /**
   * Space between the divider line and any child elements.
   */
  gap?: number;
  /**
   * Custom spacing for divider lines in different variants.
   */
  variantSpacing?: number;
}

export type LineType = 'start' | 'end';
export interface DividerRootContainerStyles
  extends Pick<DividerProps, 'variant' | 'orientation' | 'gap' | 'variantSpacing'>,
    RequiredTheme {
  /**
   * Indicates if there are child elements within the divider component.
   * This can influence layout and styling decisions.
   */
  hasChild?: boolean;
}
export interface DividerLineStyles extends Pick<DividerProps, 'borderColor' | 'textAlign'> {
  /**
   * The color scheme used in the divider, such as 'light' or 'dark'.
   */
  mode: ColorSchemeName;
  /**
   * Specifies whether the style is applied to the start or end line.
   */
  lineType: LineType;
}

export const Divider = React.forwardRef<View, DividerProps>(
  (
    {
      style,
      startLineStyles,
      endLineStyles,
      borderColor,
      gap,
      variantSpacing,
      textAlign = 'center',
      variant = 'fullWidth',
      orientation = 'horizontal',
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const colorScheme = useColorScheme();
    const hasChild = Boolean(children);

    const containerStyles = useMemo(() => {
      return StyleSheet.create({
        generated: dividerRootContainerStyles({ theme, variant, orientation, gap, hasChild, variantSpacing }),
      });
    }, [theme, variant, orientation, gap, hasChild, variantSpacing]);

    const lineStyles = useCallback(
      (lineType: LineType) => {
        return StyleSheet.create({
          generated: dividerLineStyles({ mode: colorScheme, borderColor, textAlign, lineType }),
        });
      },
      [borderColor, colorScheme, textAlign],
    );

    return (
      <View ref={ref} style={StyleSheet.flatten([styles.rootContainer, containerStyles.generated, style])} {...props}>
        <View style={StyleSheet.flatten([styles.line, lineStyles('start').generated, startLineStyles])} />
        {children}
        <View style={StyleSheet.flatten([styles.line, lineStyles('end').generated, endLineStyles])} />
      </View>
    );
  },
);
