import { StyleSheet, ViewStyle } from 'react-native';
import { DividerLineStyles, DividerRootContainerStyles } from './Divider';
import { grey } from '../../libraries';

export const styles = StyleSheet.create({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderWidth: 0.4,
  },
});

export const dividerLineStyles = ({ mode, borderColor, textAlign, lineType }: DividerLineStyles) => {
  let baseStyles: ViewStyle = {
    borderColor: borderColor || mode === 'light' ? grey[400] : grey[700],
  };
  const isStartLine = lineType === 'start';

  switch (textAlign) {
    case 'center':
      baseStyles.flex = 1;
      break;
    case 'left':
      isStartLine ? (baseStyles.flex = 0.2) : (baseStyles.flex = 0.8);
      break;
    case 'right':
      isStartLine ? (baseStyles.flex = 0.8) : (baseStyles.flex = 0.2);
      break;
  }

  return baseStyles;
};

export const dividerRootContainerStyles = ({
  theme,
  variant,
  orientation,
  gap,
  hasChild,
}: DividerRootContainerStyles): ViewStyle => {
  const { spacing } = theme;
  const isVertical = orientation === 'vertical';

  const baseStyles: ViewStyle = isVertical
    ? { paddingHorizontal: 6, alignSelf: 'flex-start', height: '100%', flexDirection: 'column' }
    : { paddingVertical: 6 };

  const styles: ViewStyle = { ...baseStyles, gap: gap || hasChild ? 10 : 0 };

  switch (variant) {
    case 'middle':
      isVertical ? (styles.paddingVertical = spacing.lg) : (styles.paddingHorizontal = spacing.lg);
      break;
    case 'startSpacing':
      isVertical ? (styles.paddingTop = spacing.lg) : (styles.paddingLeft = spacing.lg);
      break;
    case 'endSpacing':
      isVertical ? (styles.paddingBottom = spacing.lg) : (styles.paddingRight = spacing.lg);
      break;
  }

  return styles;
};
