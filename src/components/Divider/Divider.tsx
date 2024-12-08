import React, { useCallback, useMemo } from 'react';
import { ColorSchemeName, ColorValue, StyleProp, StyleSheet, useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeDividerConfigSelector, useThemeSpacingSelector } from '../../libraries';
import { Theme, ThemeDimensions } from '../../libraries/themes/v1/theme';
import { DefaultVariationOptions, GetVariantArgs, VariantTypes, VariationThemeConfig } from '../../utils';
import { dividerLineStyles, dividerRootContainerStyles, styles } from './Divider.styles';

export type DividerColorThemeConfig = {
  colors?: VariationThemeConfig<DefaultVariationOptions>;
};

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
  /**
   * Start line test id
   */
  startLineTestId?: string;
  /**
   * End line test id
   */
  endLineTestId?: string;
  /**
   * Color variants of the divider line
   */
  color?: VariantTypes;
}

export type LineType = 'start' | 'end';
export interface DividerRootContainerStyles extends Pick<DividerProps, 'variant' | 'orientation' | 'gap' | 'variantSpacing'> {
  spacing: ThemeDimensions['spacing'];
  /**
   * Indicates if there are child elements within the divider component.
   * This can influence layout and styling decisions.
   */
  hasChild?: boolean;
}
export interface DividerLineStyles extends Pick<DividerProps, 'borderColor' | 'textAlign' | 'color'> {
  /**
   * Theme configuration for the divider line
   */
  colors: Theme;
  /**
   * The color scheme used in the divider, such as 'light' or 'dark'.
   */
  mode: ColorSchemeName;
  /**
   * Specifies whether the style is applied to the start or end line.
   */
  lineType: LineType;
  /**
   * Divider line theme scheme configuration
   */
  themeColorSchemeConfig?: GetVariantArgs<DividerColorThemeConfig>['config'];
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
      startLineTestId,
      endLineTestId,
      color,
      textAlign = 'center',
      variant = 'fullWidth',
      orientation = 'horizontal',
      children,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeSpacing = useThemeSpacingSelector();
    const colorScheme = useColorScheme();
    const hasChild = Boolean(children);

    const dividerThemeConfig = useThemeDividerConfigSelector();

    const {
      startLineStyles: themeDividerStartStyles = startLineStyles,
      endLineStyles: themeDividerEndStyles = endLineStyles,
      borderColor: themeBorderColor = borderColor,
      gap: themeGap = gap,
      variantSpacing: themeVariantSpacing = variantSpacing,
      colors: themeVariantColors,
    } = dividerThemeConfig || {};

    const containerStyles = useMemo(() => {
      return dividerRootContainerStyles({
        spacing: themeSpacing,
        variant,
        orientation,
        gap: themeGap,
        hasChild,
        variantSpacing: themeVariantSpacing,
      });
    }, [themeColors, variant, orientation, themeGap, hasChild, themeVariantSpacing]);

    const lineStyles = useCallback(
      (lineType: LineType) => {
        return dividerLineStyles({
          colors: themeColors,
          mode: colorScheme,
          borderColor: themeBorderColor,
          textAlign,
          lineType,
          color,
          themeColorSchemeConfig: themeVariantColors,
        });
      },
      [themeBorderColor, colorScheme, textAlign, color, themeColors, themeVariantColors],
    );

    return (
      <View ref={ref} style={StyleSheet.flatten([styles.rootContainer, containerStyles, style])} {...props}>
        <View style={StyleSheet.flatten([styles.line, lineStyles('start'), themeDividerStartStyles])} testID={startLineTestId} />
        {children}
        <View style={StyleSheet.flatten([styles.line, lineStyles('end'), themeDividerEndStyles])} testID={endLineTestId} />
      </View>
    );
  },
);
