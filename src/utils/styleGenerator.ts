/**
 * This file contains utility functions for generating inline CSS styles based on provided properties.
 * It includes functions for handling spacing, display properties, width, height, and positioning.
 * These functions are designed to be used in generating dynamic styles within React components or similar environments.
 */
import {
  ElementFlexStyleProps,
  ElementTextStyleProps,
  KeyOfStylePalette,
  StyleEntry,
  StylePalette,
} from '../libraries/style/styleTypes';
import { styles } from '../libraries';

export const generateStyle = <T extends KeyOfStylePalette>({ propertyName, value }: StyleEntry<T>) =>
  propertyName && value !== undefined ? { [propertyName]: value } : {};

/**
 * Define a helper function to create autocomplete values for property names
 */
export const createPropertyName = <T extends KeyOfStylePalette>(propertyName: T): T => {
  return propertyName;
};

export const generateSortStyles = (args: StylePalette, elementPropertyName: keyof typeof styles) => {
  const propertyName = styles[elementPropertyName];
  if (!propertyName) return;
  return generateStyle({ propertyName, value: args[elementPropertyName] });
};

/**
 * Generate CSS styles for an element based on the provided arguments.
 * @param args ElementStylesArgs containing spacing and margin properties.
 * @returns A string representing CSS styles for the element.
 */
export const generateElementStyles = (args: StylePalette) => {
  let nativeStyles: StylePalette & ElementTextStyleProps & ElementFlexStyleProps = {};
  const keys = Object.keys(args);

  for (let property of keys) {
    const elementPropertyName = property as keyof typeof styles;
    if (args[elementPropertyName] === undefined) continue;
    nativeStyles = {
      ...nativeStyles,
      ...generateSortStyles(args, elementPropertyName),
    };
  }

  return nativeStyles;
};
