/**
 * This file contains utility functions for generating inline CSS styles based on provided properties.
 * It includes functions for handling spacing, display properties, width, height, and positioning.
 * These functions are designed to be used in generating dynamic styles within React components or similar environments.
 */
import {
  DimensionInterface,
  ElementBorderRadius,
  ElementBorderRadiusMap,
  ElementRadius,
  ElementSpacingMap,
  KeyOfStylePalette,
  SpacingStyle,
  StyleEntry,
  StylePalette,
} from '../libraries/style/styleTypes';

export const generateStyle = <T extends KeyOfStylePalette>({ propertyName, value }: StyleEntry<T>) =>
  propertyName && value !== undefined ? { [propertyName]: value } : {};

/**
    * Function to apply styles based on an array of style entries.
    * @param entries An array of style entries, each containing a propertyName and its corresponding value.
    * @returns A string representing the applied styles.
    * @example
    * applyStyles([
     { propertyName: createPropertyName('display'), value: 'flex' },
     { propertyName: createPropertyName('alignItems'), value: 'center' },
     ]);
    */
export const applyStyles = <T extends KeyOfStylePalette>(entries: StyleEntry<T>[]): StylePalette => {
  let styles: StylePalette = {};

  for (const entry of entries) {
    if (!entry?.propertyName) throw new Error(`Styles error please provide a propertyName`);
    if (entry?.value === undefined || entry?.value === 'undefined')
      throw new Error(`Styles error please provide a ${entry?.propertyName} value`);

    styles = {
      ...styles,
      ...generateStyle({ propertyName: entry?.propertyName, value: entry?.value }),
    };
  }

  return styles;
};

/**
 * Define a helper function to create autocomplete values for property names
 */
export const createPropertyName = <T extends KeyOfStylePalette>(propertyName: T): T => {
  return propertyName;
};

export const generatePaddingStyles = (args: StylePalette, elementPropertyName: keyof ElementSpacingMap) => {
  const paddingProps: { [key in keyof ElementSpacingMap]?: keyof SpacingStyle } = {
    p: 'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    ps: 'marginLeft',
    pe: 'paddingRight',
    pt: 'paddingTop',
    pb: 'paddingBottom',
  };

  const propertyName = paddingProps[elementPropertyName];
  if (!propertyName) return;
  return generateStyle({ propertyName, value: args[elementPropertyName] });
};

export const elementRadiusStyle = (args: ElementBorderRadiusMap, elementPropertyName: ElementBorderRadius) => {
  const radius: { [key in keyof ElementBorderRadiusMap]: keyof ElementRadius } = {
    r: 'borderRadius',
    ret: 'borderTopEndRadius',
    rlt: 'borderTopLeftRadius',
    ree: 'borderEndEndRadius',
    rrt: 'borderTopRightRadius',
    rse: 'borderStartEndRadius',
    res: 'borderStartEndRadius',
    rst: 'borderTopStartRadius',
    reb: 'borderBottomEndRadius',
    rlb: 'borderBottomLeftRadius',
    rss: 'borderStartStartRadius',
    rrb: 'borderBottomRightRadius',
    rsb: 'borderBottomStartRadius',
  };

  const propertyName = radius[elementPropertyName];

  if (!propertyName) return;
  return generateStyle({ propertyName, value: args[elementPropertyName] });
};

export const generateMarginStyles = (args: StylePalette, elementPropertyName: keyof ElementSpacingMap) => {
  const marginProps: { [key in keyof ElementSpacingMap]?: keyof SpacingStyle } = {
    m: 'margin',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    ms: 'marginLeft',
    me: 'marginRight',
    mt: 'marginTop',
    mb: 'marginBottom',
  };

  const propertyName = marginProps[elementPropertyName];
  if (!propertyName) return;
  return generateStyle({ propertyName, value: args[elementPropertyName] });
};

/**
 * Generate CSS styles for an element based on the provided arguments.
 * @param args ElementStylesArgs containing spacing and margin properties.
 * @returns A string representing CSS styles for the element.
 */
export const generateElementStyles = (args: StylePalette) => {
  let styles: StylePalette = {};
  const keys = Object.keys(args);

  for (let property of keys) {
    const elementPropertyName = property as keyof StylePalette;

    if (args[elementPropertyName] === undefined) continue;

    if (
      elementPropertyName === 'p' ||
      elementPropertyName === 'px' ||
      elementPropertyName === 'py' ||
      elementPropertyName === 'ps' ||
      elementPropertyName === 'pe' ||
      elementPropertyName === 'pt' ||
      elementPropertyName === 'pb'
    ) {
      styles = {
        ...styles,
        ...generatePaddingStyles(args, elementPropertyName),
      };
    } else if (
      elementPropertyName === 'm' ||
      elementPropertyName === 'mx' ||
      elementPropertyName === 'my' ||
      elementPropertyName === 'ms' ||
      elementPropertyName === 'me' ||
      elementPropertyName === 'mt' ||
      elementPropertyName == 'mb'
    ) {
      styles = {
        ...styles,
        ...generateMarginStyles(args, elementPropertyName),
      };
    } else if (
      elementPropertyName === 'r' ||
      elementPropertyName === 'ret' ||
      elementPropertyName === 'rlt' ||
      elementPropertyName === 'ree' ||
      elementPropertyName === 'rrt' ||
      elementPropertyName === 'rse' ||
      elementPropertyName === 'res' ||
      elementPropertyName === 'rst' ||
      elementPropertyName === 'reb' ||
      elementPropertyName === 'rlb' ||
      elementPropertyName === 'rss' ||
      elementPropertyName === 'rrb' ||
      elementPropertyName === 'rsb'
    ) {
      styles = {
        ...styles,
        ...elementRadiusStyle(args, elementPropertyName),
      };
    } else {
      styles = {
        ...styles,
        [elementPropertyName]: args[elementPropertyName],
      };
    }
  }

  return styles;
};

export const generateDimensionStyles = ({ width, height }: DimensionInterface) => {
  return applyStyles([
    { propertyName: createPropertyName('width'), value: width },
    { propertyName: createPropertyName('height'), value: height },
  ]);
};
