import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { containerStyles, generateContainerStyles } from './Box.style';
import { ContainerProps } from './Box.types';
import { BOX_GENERATED_CLASSNAMES } from './constants';

export const Container = React.forwardRef<View, ContainerProps>(
  ({ sx, style, maxWidth, disableGutters, children, containerStyles: containerWrapperStyles, testID, ...props }, ref) => {
    const containerWrapperTestId = testID ? `${testID}_outer` : undefined;

    const containerGeneratedStyles = useMemo(() => {
      return StyleSheet.create({
        [BOX_GENERATED_CLASSNAMES.RN_NIX_CONTAINER_INNER_SX_CLASS]: {
          ...generateContainerStyles({ maxWidth, disableGutters }),
          ...generateElementStyles(sx || {}),
        },
      });
    }, [sx, maxWidth, disableGutters]);

    return (
      <View
        style={[containerStyles[BOX_GENERATED_CLASSNAMES.RN_NIX_CONTAINER_SX_CLASS], containerWrapperStyles]}
        testID={containerWrapperTestId}
        ref={ref}>
        <View
          style={[containerGeneratedStyles[BOX_GENERATED_CLASSNAMES.RN_NIX_CONTAINER_INNER_SX_CLASS], style]}
          testID={testID}
          {...props}>
          {children}
        </View>
      </View>
    );
  },
);
