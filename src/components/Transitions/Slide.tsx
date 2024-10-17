import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { SlideProps } from './Transitions.types';

export const Slide: React.FC<SlideProps> = ({
  style,
  children,
  type = 'slideInDown',
  duration = 1000,
  delay = 0,
  applyTransition = false,
  fromValue = 50,
  toValue = 0,
  ...props
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (applyTransition) {
      switch (type) {
        case 'slideInDown':
          fromValue = -fromValue;
          toValue;
          break;
        case 'slideInUp':
          fromValue;
          toValue;
          break;
        case 'slideInLeft':
          fromValue = -fromValue;
          toValue;
          break;
        case 'slideInRight':
          fromValue;
          toValue;
          break;
        default:
          return;
      }

      slideAnim.setValue(fromValue);

      Animated.timing(slideAnim, {
        toValue,
        duration,
        delay,
        useNativeDriver: true,
      }).start();
    }
  }, [slideAnim, duration, delay, applyTransition, type]);

  const animatedStyle =
    type === 'slideInDown' || type === 'slideInUp'
      ? { transform: [{ translateY: slideAnim }] }
      : { transform: [{ translateX: slideAnim }] };

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
};
