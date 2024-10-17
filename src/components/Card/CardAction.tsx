import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { BaseButton } from '../Button/BaseButton';
import { CardActionProps } from './Card.types';

export const CardAction = React.forwardRef<TouchableWithoutFeedback, CardActionProps>(({ children, ...props }, ref) => {
  return (
    <BaseButton ref={ref} {...props}>
      {children}
    </BaseButton>
  );
});
