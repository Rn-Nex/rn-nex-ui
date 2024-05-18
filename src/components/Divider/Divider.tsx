import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import { DividerProps, DividerRootContainerProps } from './DividerTypes';
import { generateRootContainerStyles, generateDividerStyles } from './utils';

const DividerRootContainer: React.FC<DividerRootContainerProps> = ({ children, variant, style, ...props }) => {
  const dividerStyles = useMemo(() => generateRootContainerStyles({ variant }), [variant]);

  return (
    <View style={[dividerStyles, style]} {...props}>
      {children}
    </View>
  );
};

export const Divider: React.FC<DividerProps> = ({
  children,
  onLayout: dividerOnLayoutHandler,
  textAlign = 'center',
  variant = 'fullWidth',
  ...props
}) => {
  const [dividerRootLayoutRect, setDividerRootLayoutRect] = useState<LayoutRectangle>();
  const [childWrapperLayoutRect, setChildWrapperLayoutRect] = useState<LayoutRectangle>();

  const childWrapperOnLayoutHandler = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setChildWrapperLayoutRect(layout);
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
      }),
    [variant, children, childWrapperLayoutRect, dividerRootLayoutRect, textAlign],
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
      }),
    [variant, children, childWrapperLayoutRect, dividerRootLayoutRect, textAlign],
  );

  return (
    <DividerRootContainer onLayout={dividerRootOnLayoutHandler} variant={variant} {...props}>
      <View style={leftStyle} />
      {children && (
        <View style={{ paddingHorizontal: 10 }} onLayout={childWrapperOnLayoutHandler}>
          {children}
        </View>
      )}
      <View style={rightStyle} />
    </DividerRootContainer>
  );
};

Divider.displayName = 'Divider';
