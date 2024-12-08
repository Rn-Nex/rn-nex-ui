import _ from 'lodash';
import React, { useCallback } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { grey, useThemeButtonGroupConfigSelector, useThemeColorsSelector } from '../../libraries';
import { getVariant, VariantTypes } from '../../utils';
import { Box } from '../Box';
import { styles } from './Button.styles';
import { ButtonProps, ButtonVariations } from './Button.types';

export interface ButtonGroupProps extends ViewProps, Pick<ButtonProps, 'disableRipple' | 'baseButtonStyles' | 'sx'> {
  roundSize?: number;
  borderWidth?: number;
  removeBorders?: boolean;
  variation?: ButtonVariations;
  buttonColor?: VariantTypes;
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
      sx,
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
    const themeColors = useThemeColorsSelector();
    const themeButtonGroupConfig = useThemeButtonGroupConfigSelector();

    const childrenCount = React.Children.count(children);
    const isOutlinedButton = variation === 'outlined';
    const isTextButton = variation === 'text';

    const {
      roundSize: applyButtonGroupRoundSize = roundSize,
      borderWidth: applyBorderWidth = borderWidth,
      removeBorders: applyRemoveBorders = removeBorders,
      disableRipple: applyDisableRipple = disableRipple,
      baseButtonStyles: applyBaseButtonStyles = baseButtonStyles,
      style: applyStyles = style,
      sx: applySx = sx,
    } = themeButtonGroupConfig || {};

    const getBorderWidth = ({ position, isFirst, isLast, removeBorders, borderWidth }: GetBorderWidthInterface) => {
      const isLeftPosition = position === 'left';

      if (!isFirst && !isLast && removeBorders) return 0;
      if (isLast && removeBorders && isLeftPosition) return 0;

      if (isFirst && !isTextButton && isLeftPosition) return borderWidth;
      if (isLast && !isTextButton && !isLeftPosition) return borderWidth;

      if (childrenCount === 2 && isLast && isLeftPosition) return borderWidth;

      if (childrenCount > 2) {
        if (isFirst && !isLeftPosition) return 0;
        if (!isFirst && !isLast) return isLeftPosition ? borderWidth : 0;
        if (isLast && isLeftPosition) return borderWidth;
      }

      return 0;
    };

    const renderElements = useCallback(() => {
      return React.Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;

        const borderStyles: ViewStyle = {
          borderTopLeftRadius: isFirst ? applyButtonGroupRoundSize : 0,
          borderBottomLeftRadius: isFirst ? applyButtonGroupRoundSize : 0,
          borderTopRightRadius: isLast ? applyButtonGroupRoundSize : 0,
          borderBottomRightRadius: isLast ? applyButtonGroupRoundSize : 0,
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, colors: themeColors }) : grey[300],
          borderLeftWidth: getBorderWidth({
            position: 'left',
            isFirst,
            isLast,
            borderWidth: applyBorderWidth,
            removeBorders: applyRemoveBorders,
          }),
          borderRightWidth: getBorderWidth({
            position: 'right',
            isFirst,
            isLast,
            borderWidth: applyBorderWidth,
            removeBorders: applyRemoveBorders,
          }),
          ...(borderWidth && !isTextButton && { borderTopWidth: applyBorderWidth }),
          ...(borderWidth && !isTextButton && { borderBottomWidth: applyBorderWidth }),
        };

        if (React.isValidElement(child)) {
          const childProps: ButtonProps = {
            baseButtonStyles: _.merge({}, borderStyles, applyBaseButtonStyles),
            disableScaleAnimation: true,
            variation,
            buttonColor,
            disableRipple: applyDisableRipple,
            ...child?.props,
          };

          return React.cloneElement(child, childProps);
        }
        return child;
      });
    }, [
      applyButtonGroupRoundSize,
      children,
      applyBorderWidth,
      applyRemoveBorders,
      variation,
      buttonColor,
      themeColors,
      applyDisableRipple,
      applyBaseButtonStyles,
    ]);

    return (
      <Box style={[styles.buttonGroupContainer, applyStyles]} sx={applySx} {...props} ref={ref}>
        {renderElements()}
      </Box>
    );
  },
);
