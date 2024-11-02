import React from 'react';
import { Image as RnImage } from 'react-native';
import { Image } from '../Image';
import { ImageProps } from '../types';

export interface AvatarProps extends ImageProps {}
export const Avatar = React.forwardRef<RnImage, AvatarProps>((props, ref) => {
  return <Image ref={ref} {...props} />;
});

Avatar.displayName = 'Avatar';
