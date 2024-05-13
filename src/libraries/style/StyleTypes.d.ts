import {
  AnimatableNumericValue,
  DimensionValue,
  FlexStyle,
  ImageStyle,
  TextStyle,
  TransformsStyle,
  ViewStyle,
} from 'react-native';

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
export type ElementPadding = 'p' | 'px' | 'py' | 'ps' | 'pe' | 'pt' | 'pb';

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
export type ElementMargin = 'm' | 'mx' | 'my' | 'ms' | 'me' | 'mt' | 'mb';

/**
 * Defines the types of dimension-related properties commonly used in React Native styling.
 * @example
 * 'w': Sets the width of an element.
 * 'h': Sets the height of an element.
 * 'minW': Sets the minimum width of an element.
 * 'minH': Sets the minimum height of an element.
 * 'maxW': Sets the maximum width of an element.
 * 'maxH': Sets the maximum height of an element.
 */
export type ElementDimension = 'w' | 'h' | 'minW' | 'minH' | 'maxW' | 'maxH';

/**
 * Represents a mapping of padding and margin types to their corresponding ELementDimensionMap.
 * Each key in the ELementDimensionMap represents either a padding type or a margin type,
 * and the value is a ELementDimensionMap defining the dimension properties (e.g., width, height).
 */
export type ELementDimensionMap<T> = {
  [key in T]?: DimensionValue;
};

/**
 * Defines the types of position-related properties commonly used in React Native styling.
 * @example
 * 'pos': Sets the positioning method used for an element.
 * 'posT': Sets the top position of a positioned element.
 * 'posB': Sets the bottom position of a positioned element.
 * 'posL': Sets the left position of a positioned element.
 * 'posR': Sets the right position of a positioned element.
 */
export type PositionType = {
  pos?: ViewStyle['position'];
};
export type ElementPosition = 'posT' | 'posB' | 'posL' | 'posR';
export type ElementPositionMap = {
  [key in ElementPosition]?: DimensionValue;
} & PositionType;
export interface PositionStyles extends Pick<FlexStyle, 'position' | 'right' | 'left' | 'top' | 'bottom'> {}
export type KeyOfPositionStyles = keyof PositionStyles;

/**
 * Type alias for element border radius properties.
 * Abbreviations:
 * @example
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

/**
 * Defines the types of text-related properties commonly used in React Native styling.
 * @example
 * 'color': Sets the color of text within an element.
 * 'family': Sets the font family of text within an element.
 * 'size': Sets the font size of text within an element.
 * 'style': Sets the font style of text within an element.
 * 'weight': Sets the font weight of text within an element.
 * 'lSpacing': Sets the spacing between characters of text within an element.
 * 'content': Sets the content alignment within a flex container.
 * 'self': Sets the self-alignment of individual flex items within a flex container.
 * 'items': Sets the alignment of flex items along the cross-axis of their container.
 * 'dLine': Sets the decoration line to be used on text within an element.
 * 'dStyle': Sets the style of the decoration line on text within an element.
 * 'dColor': Sets the color of the decoration line on text within an element.
 * 'sColor': Sets the color of the shadow of text within an element.
 * 'sOffset': Sets the offset of the shadow of text within an element.
 * 'sRadius': Sets the radius of the shadow of text within an element.
 * 'transform': Sets the transformation of text within an element.
 * 'select': Sets whether text can be selected within an element.
 */
export type ElementTextStyleProps = {
  color?: TextStyle['color'];
  family?: TextStyle['fontFamily'];
  size?: TextStyle['fontSize'];
  style?: TextStyle['fontStyle'];
  weight?: TextStyle['fontWeight'];
  lSpacing?: TextStyle['letterSpacing'];
  content?: TextStyle['alignContent'];
  self?: TextStyle['alignSelf'];
  items?: TextStyle['alignItems'];
  dLine?: TextStyle['textDecorationLine'];
  dStyle?: TextStyle['textDecorationStyle'];
  dColor?: TextStyle['textDecorationColor'];
  sColor?: TextStyle['shadowColor'];
  sOffset?: TextStyle['shadowOffset'];
  sRadius?: TextStyle['shadowRadius'];
  transform?: TextStyle['textTransform'];
  select?: TextStyle['userSelect'];
};

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
    | 'width'
    | 'height'
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
  > {}
export type KeyOfSpacingStyle = keyof SpacingStyle;

export interface StylePalette
  extends ViewStyle,
    TextStyle,
    TransformsStyle,
    ImageStyle,
    ELementDimensionMap<ElementPadding | ElementMargin | ElementDimension>,
    ElementPositionMap,
    ElementTextStyleProps,
    ElementBorderRadiusMap {}

export type KeyOfStylePalette = keyof StylePalette;

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

export interface ElementBorderColorStyles
  extends Pick<
    ViewStyle,
    'borderBlockColor' | 'borderBlockEndColor' | 'borderBlockStartColor' | 'borderBottomColor' | 'borderColor'
  > {}
