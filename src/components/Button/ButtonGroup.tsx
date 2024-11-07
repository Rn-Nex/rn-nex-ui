import React, { useCallback } from 'react';
import { View, ViewProps } from 'react-native';
import { styles } from './Button.styles';
import { ButtonProps } from './Button.types';

export interface ButtonGroupProps extends ViewProps {
  roundSize?: number;
}

export const ButtonGroup = React.forwardRef<View, ButtonGroupProps>(({ style, children, roundSize = 6, ...props }, ref) => {
  const renderElements = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      const borderRadiusStyle = {
        borderTopLeftRadius: isFirst ? roundSize : 0,
        borderBottomLeftRadius: isFirst ? roundSize : 0,
        borderTopRightRadius: isLast ? roundSize : 0,
        borderBottomRightRadius: isLast ? roundSize : 0,
      };

      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          style: { flex: 1 },
          baseButtonStyles: borderRadiusStyle,
        } as ButtonProps);
      }
      return child;
    });
  }, [roundSize, children]);

  return (
    <View style={[styles.buttonGroupContainer, style]} {...props} ref={ref}>
      {renderElements()}
    </View>
  );
});
