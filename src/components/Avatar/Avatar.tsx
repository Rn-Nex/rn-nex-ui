import React from 'react';
import { Image as RnImage } from 'react-native';
import { Image } from '../Image';
import { AvatarProps } from './AvatarTypes';

export const Avatar = React.forwardRef<RnImage, AvatarProps>((props, ref) => {
   return <Image ref={ref} {...props} />;
});

Avatar.displayName = 'Avatar';
