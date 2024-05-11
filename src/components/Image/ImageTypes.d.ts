import {
   DimensionValue,
   ImageProps as RnImageProps,
   ImageStyle,
   AnimatableNumericValue,
   Image,
} from 'react-native';
import { ElementRadius } from '../../libraries/style/styleTypes';

/**
 * Define the type for the variant of the image.
 */
export type ImageVariant =
   | 'square'
   | 'rounded'
   | 'rounded-sm'
   | 'rounded-md'
   | 'rounded-lg'
   | 'rounded-xl';

/**
 * Interface for the image variation property, which may be used in styling.
 */
export interface ImageVariationProp {
   variation?: ImageVariant;
}

/**
 * Interface defining styles for different image variations based on ElementRadius.
 */
export interface ImageVariationStyles {
   [key: keyof typeof ElementRadius]: AnimatableNumericValue;
}

/**
 * Interface for properties that can be passed to an image component.
 * Extends React Native ImageProps and ImageVariationProp for styling flexibility.
 */
export interface ImageProps
   extends React.ComponentType<Image>,
      RnImageProps,
      ImageVariationProp {
   /**
    * Size of the image.
    */
   size?: DimensionValue;

   /**
    * Custom styles to be applied to the image.
    */
   sx?: ImageStyle;
}
