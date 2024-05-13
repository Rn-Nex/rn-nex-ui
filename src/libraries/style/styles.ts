import {
  ELementDimensionMap,
  ElementBorderRadiusMap,
  ElementDimension,
  ElementMargin,
  ElementPadding,
  ElementPositionMap,
  ElementRadius,
  KeyOfPositionStyles,
  KeyOfSpacingStyle,
} from './styleTypes';

export const padding: Record<keyof ELementDimensionMap<ElementPadding>, KeyOfSpacingStyle> = {
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  ps: 'marginLeft',
  pe: 'paddingRight',
  pt: 'paddingTop',
  pb: 'paddingBottom',
};

export const radius: Record<keyof ElementBorderRadiusMap, keyof ElementRadius> = {
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

export const margin: Record<keyof ELementDimensionMap<ElementMargin>, KeyOfSpacingStyle> = {
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  ms: 'marginLeft',
  me: 'marginRight',
  mt: 'marginTop',
  mb: 'marginBottom',
};

export const position: Record<keyof ElementPositionMap, KeyOfPositionStyles> = {
  pos: 'position',
  posB: 'bottom',
  posL: 'left',
  posR: 'right',
  posT: 'top',
};

export const dimension: Record<keyof ELementDimensionMap<ElementDimension>, KeyOfSpacingStyle> = {
  w: 'width',
  h: 'height',
  minW: 'minWidth',
  minH: 'minHeight',
  maxW: 'maxWidth',
  maxH: 'maxHeight',
};

export const styles = {
  ...padding,
  ...radius,
  ...margin,
  ...position,
  ...dimension,
};
