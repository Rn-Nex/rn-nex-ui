import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { useTheme } from '../../libraries';
import { DividerProps, DividerRootContainerProps } from './DividerTypes';
import { generateDividerStyles, generateRootContainerStyles } from './utils';

const DividerRootContainer: React.FC<DividerRootContainerProps> = ({ children, variant, style, orientation, ...props }) => {
  const dividerStyles = useMemo(() => generateRootContainerStyles({ variant, orientation }), [variant, orientation]);

  return (
    <View style={[dividerStyles, style]} {...props}>
      {children}
    </View>
  );
};

export const Divider: React.FC<DividerProps> = ({
  children,
  dividerBorderStyles,
  leftDividerBorderStyle,
  rightDividerBorderStyle,
  onLayout: dividerOnLayoutHandler,
  orientation = 'horizontal',
  textAlign = 'center',
  variant = 'fullWidth',
  ...props
}) => {
  const { theme } = useTheme();
  const [dividerRootLayoutRect, setDividerRootLayoutRect] = useState<LayoutRectangle>();
  const [childWrapperLayoutRect, setChildWrapperLayoutRect] = useState<LayoutRectangle>();

  const childWrapperOnLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setChildWrapperLayoutRect(prev => {
      if (!prev || prev.width !== layout.width || prev.height !== layout.height) {
        return layout;
      }
      return prev;
    });
  }, []);

  const dividerRootOnLayoutHandler = useCallback(
    (event: LayoutChangeEvent) => {
      const { layout } = event.nativeEvent;
      if (dividerOnLayoutHandler) {
        dividerOnLayoutHandler(event);
      }
      setDividerRootLayoutRect(layout);
    },
    [dividerOnLayoutHandler],
  );

  const leftStyle = useMemo(
    () =>
      generateDividerStyles({
        dividerType: 'left',
        variant,
        hasChild: !!children,
        childWrapperLayoutRect,
        dividerRootLayoutRect,
        textAlign,
        orientation,
        theme,
      }),
    [variant, !!children, !!childWrapperLayoutRect, !!dividerRootLayoutRect, textAlign, orientation, theme],
  );

  const rightStyle = useMemo(
    () =>
      generateDividerStyles({
        dividerType: 'right',
        variant,
        hasChild: !!children,
        childWrapperLayoutRect,
        dividerRootLayoutRect,
        textAlign,
        orientation,
        theme,
      }),
    [variant, !!children, !!childWrapperLayoutRect, !!dividerRootLayoutRect, textAlign, orientation, theme],
  );

  return (
    <DividerRootContainer orientation={orientation} onLayout={dividerRootOnLayoutHandler} variant={variant} {...props}>
      <View style={[leftStyle, leftDividerBorderStyle, dividerBorderStyles]} />
      {children && (
        <View style={{ paddingHorizontal: 10 }} onLayout={childWrapperOnLayoutHandler}>
          {children}
        </View>
      )}
      <View style={[rightStyle, rightDividerBorderStyle, dividerBorderStyles]} />
    </DividerRootContainer>
  );
};

Divider.displayName = 'Divider';
