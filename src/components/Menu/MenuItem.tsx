import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../libraries';
import { BaseButton } from '../Button/BaseButton';
import { menuItemContainerStyles, styles } from './Menu.style';
import { MenuItemProps } from './Menu.types';

export const MenuItem = React.forwardRef<View, MenuItemProps>(
  (
    {
      children,
      style,
      adornment,
      adornmentContainerStyles,
      selected,
      disabled,
      adornmentMinWidth = 60,
      adornmentType = 'end',
      actionType = 'element',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const containerStyles = useMemo(() => {
      return StyleSheet.create({
        generated: menuItemContainerStyles({ selected, theme, disabled }),
      });
    }, [selected, theme, disabled]);

    const renderAdornment = useCallback(() => {
      return (
        <View style={StyleSheet.flatten([styles.adornment, adornmentContainerStyles, { minWidth: adornmentMinWidth }])}>
          {adornment}
        </View>
      );
    }, [adornment, adornmentContainerStyles, adornmentMinWidth]);

    const renderChild = useCallback(() => {
      if (actionType === 'element') {
        return (
          <React.Fragment>
            {adornment && adornmentType === 'start' && renderAdornment()}
            <View style={styles.menuItemBaseButtonContainer}>
              <BaseButton style={styles.baseButton} disabled={disabled} {...props}>
                {children}
              </BaseButton>
            </View>
            {adornment && adornmentType === 'end' && renderAdornment()}
          </React.Fragment>
        );
      } else if (actionType === 'root') {
        return (
          <View style={styles.menuItemBaseButtonContainer}>
            <BaseButton style={styles.baseButton} disabled={disabled} {...props}>
              {adornment && adornmentType === 'start' && renderAdornment()}
              {children}
              {adornment && adornmentType === 'end' && renderAdornment()}
            </BaseButton>
          </View>
        );
      }
    }, [adornment, adornmentType, disabled, props, actionType]);

    return (
      <View style={StyleSheet.flatten([containerStyles.generated, styles.menuContainer, style])} ref={ref}>
        <View style={[styles.menuItemInnerContainer]}>{renderChild()}</View>
      </View>
    );
  },
);
