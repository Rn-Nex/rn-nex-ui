import {
  AnimatableNumericValue,
  DimensionValue,
  FlexStyle,
  ImageStyle,
  TextProps as RnTextProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  TransformsStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { BoxProps } from '../../components/Box/interfaces';
import { TextProps } from '../../components/Typography/interfaces';

/**
 * Interface defining properties related to spacing styles, such as margins and paddings.
 * This extends the FlexStyle interface and picks specific properties relevant to spacing.
 */
export interface SpacingStyle
  extends Pick<
    FlexStyle,
    | 'gap'
    | 'margin'
    | 'marginBottom'
    | 'marginEnd'
    | 'marginHorizontal'
    | 'marginLeft'
    | 'marginRight'
    | 'marginStart'
    | 'marginTop'
    | 'marginVertical'
    | 'padding'
    | 'paddingBottom'
    | 'paddingEnd'
    | 'paddingHorizontal'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingStart'
    | 'paddingTop'
    | 'paddingVertical'
  > {}

export interface StylePalette
  extends ViewStyle,
    TextStyle,
    TransformsStyle,
    ImageStyle,
    ElementSpacingMap,
    ElementBorderRadiusMap {}

export type KeyOfStylePalette = keyof StylePalette;
export type KeyOfTextStyleFontWeight = keyof TextStyle['fontWeight'];

/**
 * Define the object structure for each entry in the array Property name should be one of
 * the keys of StylePalette
 * Value type is determined based on the propertyName
 */
export interface StyleEntry<T extends KeyOfStylePalette> {
  propertyName: T;
  value: StylePalette[T];
}

/**
 * Define a type representing the props of common native elements such as View, Text, TouchableOpacity.
 */
export type NativeElementProps = ViewProps | RnTextProps | TouchableOpacityProps;

/**
 * Define a type representing the props of styled components.
 */
export type StyledElementProps = BoxProps | TextProps;

/**
 * Define a type representing common native elements used in the application,
 * including View, Text, TouchableOpacity, and TouchableWithoutFeedback. etc.
 */
export type NativeElements = View | Text | TouchableOpacity | TouchableWithoutFeedback;

/**
 * Define a type representing React component ref attributes for the native elements, ensuring
 * compatibility with React's ref system.
 */
export type ReactComponentRefAttributesType = React.RefAttributes<NativeElements>;
/**
 * Interface defining dimensions for width and height.
 * Each dimension can be a number, string, or a combination of both (e.g., '100%', 200).
 */
export interface DimensionInterface {
  width?: DimensionValue;
  height?: DimensionValue;
}
/**
 * Defines the types of padding that can be applied to an element.
 * @example
 * 'p': Padding on all sides
 * 'px': Horizontal padding (left and right)
 * 'py': Vertical padding (top and bottom)
 * 'ps': Padding on the start side (left in LTR, right in RTL)
 * 'pe': Padding on the end side (right in LTR, left in RTL)
 * 'pt': Padding on the top side.
 * 'pb': Padding on the bottom side
 */
export type ElementPaddingTypes = 'p' | 'px' | 'py' | 'ps' | 'pe' | 'pt' | 'pb';

/**
 * Defines the types of margin that can be applied to an element.
 * @example
 * 'm': Margin on all sides
 * 'mx': Horizontal margin (left and right)
 * 'my': Vertical margin (top and bottom)
 * 'ms': Margin on the start side (left in LTR, right in RTL)
 * 'me': Margin on the end side (right in LTR, left in RTL)
 * 'mt': Margin on the top side
 * 'mb': Margin on the bottom side
 */
export type ElementMarginTypes = 'm' | 'mx' | 'my' | 'ms' | 'me' | 'mt' | 'mb';

/**
 * Represents a mapping of padding types to their corresponding dimension values.
 * Each key in the ElementPaddingTypes represents a padding type, and the value is a DimensionValue.
 * DimensionValue can be a string representing a CSS size (e.g., '10px') or a number representing pixels.
 */
export type ElementPaddingMap = {
  [key in ElementPaddingTypes]?: DimensionValue;
};
/**
 * Represents a mapping of margin types to their corresponding dimension values.
 * Each key in the ElementMarginTypes represents a margin type, and the value is a DimensionValue.
 * DimensionValue can be a string representing a CSS size (e.g., '10px') or a number representing pixels.
 */
export type ElementMarginMap = {
  [key in ElementMarginTypes]?: DimensionValue;
};

/**
 * Represents a mapping of padding and margin types to their corresponding DimensionInterface.
 * Each key in the ElementSpacingMap represents either a padding type or a margin type,
 * and the value is a DimensionInterface defining the dimension properties (e.g., width, height).
 */
export type ElementSpacingMap = {
  [key in ElementPaddingTypes | ElementMarginTypes]?: DimensionValue;
};
export interface SpacingProps extends ElementSpacingMap, SpacingStyle {}

/**
 * interface for element border radius properties, which may be used in styling
 */
export interface ElementRadius
  extends Pick<
    ViewStyle,
    | 'borderRadius'
    | 'borderTopEndRadius'
    | 'borderTopLeftRadius'
    | 'borderEndEndRadius'
    | 'borderTopRightRadius'
    | 'borderEndStartRadius'
    | 'borderStartEndRadius'
    | 'borderTopStartRadius'
    | 'borderBottomEndRadius'
    | 'borderBottomLeftRadius'
    | 'borderStartStartRadius'
    | 'borderBottomRightRadius'
    | 'borderBottomStartRadius'
    | 'shadowRadius'
  > {}
/**
 * Type alias for element border radius properties.
 * Abbreviations:
 * - 'r': 'borderRadius'
 * - 'ret': 'borderTopEndRadius'
 * - 'rlt': 'borderTopLeftRadius'
 * - 'ree': 'borderEndEndRadius'
 * - 'rrt': 'borderTopRightRadius'
 * - 'rse': 'borderEndStartRadius'
 * - 'res': 'borderStartEndRadius'
 * - 'rst': 'borderTopStartRadius'
 * - 'reb': 'borderBottomEndRadius'
 * - 'rlb': 'borderBottomLeftRadius'
 * - 'rss': 'borderStartStartRadius'
 * - 'rrb': 'borderBottomRightRadius'
 * - 'rsb': 'borderBottomStartRadius'
 */
export type ElementBorderRadius =
  | 'r'
  | 'ret'
  | 'rlt'
  | 'ree'
  | 'rrt'
  | 'rse'
  | 'res'
  | 'rst'
  | 'reb'
  | 'rlb'
  | 'rss'
  | 'rrb'
  | 'rsb';

/**
 * Mapping of element border radius keys to their respective animatable numeric values.
 */
export type ElementBorderRadiusMap = {
  [key in ElementBorderRadius]?: AnimatableNumericValue;
};

export interface ElementBorderColorStyles
  extends Pick<
    ViewStyle,
    'borderBlockColor' | 'borderBlockEndColor' | 'borderBlockStartColor' | 'borderBottomColor' | 'borderColor'
  > {}

export interface ElementBorderStyles extends ElementRadius, ElementBorderColorStyles {}
