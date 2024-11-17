import React, { useCallback } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { getVariant, VariantTypes } from '../../utils';
import { styles } from './Button.styles';
import { ButtonProps, ButtonVariations } from './Button.types';

export interface ButtonGroupProps extends ViewProps {
  roundSize?: number;
  borderWidth?: number;
  removeBorders?: boolean;
  variation?: ButtonVariations;
  buttonColor?: VariantTypes;
}

export const ButtonGroup = React.forwardRef<View, ButtonGroupProps>(
  (
    {
      style,
      children,
      variation = 'contained',
      buttonColor = 'secondary',
      removeBorders = false,
      roundSize = 6,
      borderWidth = 1,
      ...props
    },
    ref,
  ) => {
    const childrenCount = React.Children.count(children);
    const { theme } = useTheme();

    const renderElements = useCallback(() => {
      return React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        const isOutlinedButton = variation === 'outlined';

        const borderStyles: ViewStyle = {
          borderTopLeftRadius: isFirst ? roundSize : 0,
          borderBottomLeftRadius: isFirst ? roundSize : 0,
          borderTopRightRadius: isLast ? roundSize : 0,
          borderBottomRightRadius: isLast ? roundSize : 0,
          borderLeftWidth: removeBorders ? 0 : borderWidth,
          borderRightWidth: removeBorders ? 0 : borderWidth,
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, theme }) : grey[300],
        };

        if (!removeBorders) {
          if (isFirst && childrenCount > 1) {
            borderStyles.borderRightWidth = 0;
            if (!isOutlinedButton) {
              borderStyles.borderLeftWidth = 0;
            }
          } else if (childrenCount === 2 && isLast) {
            borderStyles.borderLeftWidth = borderWidth;
          } else if (!isLast) {
            borderStyles.borderRightWidth = 0;
          } else if (isLast && !isOutlinedButton) {
            borderStyles.borderRightWidth = 0;
          }
        }

        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            style: { flex: 1 },
            baseButtonStyles: borderStyles,
            disableScaleAnimation: true,
            variation,
            buttonColor,
          } as ButtonProps);
        }
        return child;
      });
    }, [roundSize, childrenCount, children, borderWidth, removeBorders, variation, buttonColor, theme]);

    return (
      <View style={[styles.buttonGroupContainer, style]} {...props} ref={ref}>
        {renderElements()}
      </View>
    );
  },
);
