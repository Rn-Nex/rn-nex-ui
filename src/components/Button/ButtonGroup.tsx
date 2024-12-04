import React, { useCallback } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { grey, useTheme } from '../../libraries';
import { getVariant, VariantTypes } from '../../utils';
import { styles } from './Button.styles';
import { ButtonProps, ButtonVariations } from './Button.types';
import _ from 'lodash';

export interface ButtonGroupProps extends ViewProps, Pick<ButtonProps, 'disableRipple' | 'baseButtonStyles'> {
  roundSize?: number;
  borderWidth?: number;
  removeBorders?: boolean;
  variation?: ButtonVariations;
  buttonColor?: VariantTypes;
  childFullWidth?: boolean;
}
interface GetBorderWidthInterface extends Pick<ButtonGroupProps, 'removeBorders' | 'borderWidth'> {
  position: 'left' | 'right';
  isFirst?: boolean;
  isLast?: boolean;
}

export const ButtonGroup = React.forwardRef<View, ButtonGroupProps>(
  (
    {
      style,
      children,
      baseButtonStyles,
      childFullWidth = false,
      disableRipple = false,
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
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

    const getBorderWidth = ({ position, isFirst, isLast, removeBorders, borderWidth }: GetBorderWidthInterface) => {
      if (removeBorders) return 0;
      const isLeftPosition = position === 'left';

      if (isFirst && childrenCount === 1 && isTextButton) return 0;

      if (childrenCount === 2 && isLast && isLeftPosition) {
        return isOutlinedButton ? 0 : borderWidth;
      }

      if (childrenCount > 2) {
        if (isFirst && !isLeftPosition) return 0;
        if (!isFirst && !isLast) return isLeftPosition ? borderWidth : 0;
        if (isLast && isLeftPosition) return borderWidth;
      }
    };

    const renderElements = useCallback(() => {
      return React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const borderStyles: ViewStyle = {
          borderTopLeftRadius: isFirst ? roundSize : 0,
          borderBottomLeftRadius: isFirst ? roundSize : 0,
          borderTopRightRadius: isLast ? roundSize : 0,
          borderBottomRightRadius: isLast ? roundSize : 0,
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, theme }) : grey[300],
          borderLeftWidth: getBorderWidth({ position: 'left', isFirst, isLast, borderWidth, removeBorders }),
          borderRightWidth: getBorderWidth({ position: 'right', isFirst, isLast, borderWidth, removeBorders }),
        };

        if (React.isValidElement(child)) {
          const childProps: ButtonProps = {
            baseButtonStyles: _.merge({}, borderStyles, baseButtonStyles),
            disableScaleAnimation: true,
            variation,
            buttonColor,
            disableRipple,
            ...child?.props,
          };

          if (childFullWidth) {
            childProps.style = { flex: 1 };
          }

          return React.cloneElement(child, childProps);
        }
        return child;
      });
    }, [
      roundSize,
      children,
      borderWidth,
      removeBorders,
      variation,
      buttonColor,
      theme,
      disableRipple,
      baseButtonStyles,
      childFullWidth,
    ]);

    return (
      <View style={[styles.buttonGroupContainer, style]} {...props} ref={ref}>
        {renderElements()}
      </View>
    );
  },
);
