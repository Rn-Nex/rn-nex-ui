import React, { useRef, useState } from 'react';
import {
   Animated,
   GestureResponderEvent,
   LayoutChangeEvent,
   LayoutRectangle,
   TouchableWithoutFeedback,
} from 'react-native';
import { Ripple } from '../Ripple';
import { BaseButtonProps } from './ButtonTypes';
import { RippleInterface } from '../Ripple/RippleTypes';

export const BaseButton = React.forwardRef<
   TouchableWithoutFeedback,
   BaseButtonProps
>(
   (
      {
         disableRipple,
         disabled,
         children,
         ripple,
         rippleEdge,
         sx,
         onLayout: onLayoutHandler,
         onPress: onPressHandler,
         onLongPress: onLongPressHandler,
         ...props
      },
      ref,
   ) => {
      const rippleRef = useRef<RippleInterface>(null);
      const [buttonLayoutRectangle, setButtonLayoutRectangle] =
         useState<LayoutRectangle>();

      const buttonPressHandler = (event: GestureResponderEvent) => {
         if (
            onPressHandler &&
            typeof onPressHandler === 'function' &&
            !disabled
         ) {
            const { locationX, locationY } = event.nativeEvent;
            if (rippleRef.current && buttonLayoutRectangle) {
               if (rippleEdge) {
                  rippleRef.current?.createRippleFromPosition(
                     rippleEdge,
                     buttonLayoutRectangle,
                  );
               } else {
                  rippleRef.current.startRipple(locationX, locationY);
               }
            }
            onPressHandler(event);
         }
      };

      const buttonLongPressHandler = (event: GestureResponderEvent) => {
         if (
            onLongPressHandler &&
            typeof onLongPressHandler === 'function' &&
            !disabled
         ) {
            const { locationX, locationY } = event.nativeEvent;
            if (rippleRef.current && buttonLayoutRectangle) {
               if (rippleEdge) {
                  rippleRef.current?.createRippleFromPosition(
                     rippleEdge,
                     buttonLayoutRectangle,
                  );
               } else {
                  rippleRef.current.startRipple(locationX, locationY);
               }
            }
         }
      };

      const buttonLayoutHandler = (event: LayoutChangeEvent) => {
         const { layout } = event.nativeEvent;
         setButtonLayoutRectangle(layout);
         if (onLayoutHandler && typeof onLayoutHandler === 'function')
            onLayoutHandler(event);
      };

      return (
         <TouchableWithoutFeedback
            ref={ref}
            onPress={buttonPressHandler}
            onLongPress={buttonLongPressHandler}
            onLayout={buttonLayoutHandler}
            {...props}>
            <Animated.View pointerEvents="box-only" style={sx}>
               {children}
               {disableRipple ? null : <Ripple ref={rippleRef} {...ripple} />}
            </Animated.View>
         </TouchableWithoutFeedback>
      );
   },
);
