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
      roundSize: themeButtonGroupRoundSize = roundSize,
      borderWidth: themeBorderWidth = borderWidth,
      removeBorders: themeRemoveBorders = removeBorders,
      disableRipple: themeDisableRipple = disableRipple,
      baseButtonStyles: themeBaseButtonStyles = baseButtonStyles,
      style: themeStyles = style,
      sx: themeSx = sx,
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
          borderTopLeftRadius: isFirst ? themeButtonGroupRoundSize : 0,
          borderBottomLeftRadius: isFirst ? themeButtonGroupRoundSize : 0,
          borderTopRightRadius: isLast ? themeButtonGroupRoundSize : 0,
          borderBottomRightRadius: isLast ? themeButtonGroupRoundSize : 0,
          borderColor: isOutlinedButton ? getVariant({ variant: buttonColor, colors: themeColors }) : grey[300],
          borderLeftWidth: getBorderWidth({
            position: 'left',
            isFirst,
            isLast,
            borderWidth: themeBorderWidth,
            removeBorders: themeRemoveBorders,
          }),
          borderRightWidth: getBorderWidth({
            position: 'right',
            isFirst,
            isLast,
            borderWidth: themeBorderWidth,
            removeBorders: themeRemoveBorders,
          }),
          ...(borderWidth && !isTextButton && { borderTopWidth: themeBorderWidth }),
          ...(borderWidth && !isTextButton && { borderBottomWidth: themeBorderWidth }),
        };

        if (React.isValidElement(child)) {
          const childProps: ButtonProps = {
            baseButtonStyles: _.merge({}, borderStyles, themeBaseButtonStyles),
            disableScaleAnimation: true,
            variation,
            buttonColor,
            disableRipple: themeDisableRipple,
            ...child?.props,
          };

          return React.cloneElement(child, childProps);
        }
        return child;
      });
    }, [
      themeButtonGroupRoundSize,
      children,
      themeBorderWidth,
      themeRemoveBorders,
      variation,
      buttonColor,
      themeColors,
      themeDisableRipple,
      themeBaseButtonStyles,
    ]);

    return (
      <Box style={[styles.buttonGroupContainer, themeStyles]} sx={themeSx} {...props} ref={ref}>
        {renderElements()}
      </Box>
    );
  },
);
