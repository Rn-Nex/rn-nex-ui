import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { containerStyles, generateContainerStyles, generateContainerWrapperStyles } from './Box.style';
import { ContainerProps } from './Box.types';

export const Container = React.forwardRef<View, ContainerProps>(
  ({ sx, style, maxWidth, disableGutters, flex, children, containerStyles: containerWrapperStyles, testID, ...props }, ref) => {
    const containerWrapperTestId = testID ? `${testID}_outer` : undefined;

    const containerGeneratedStyles = useMemo(() => {
      return StyleSheet.create({
        containerInnerSX: {
          ...generateContainerStyles({ maxWidth, disableGutters, flex }),
          ...generateElementStyles(sx || {}),
        },
      });
    }, [sx, maxWidth, disableGutters, flex]);

    return (
      <View
        style={[containerStyles.containerSX, generateContainerWrapperStyles({ flex }), containerWrapperStyles]}
        testID={containerWrapperTestId}
        ref={ref}>
        <View style={[containerGeneratedStyles.containerInnerSX, style]} testID={testID} {...props}>
          {children}
        </View>
      </View>
    );
  },
);
