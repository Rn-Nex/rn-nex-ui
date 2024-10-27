import { Dimensions } from 'react-native';
import { ThemeType } from '../libraries/themes/v1/theme';

export const OFFSET = 20;
export const WRAPPER_BOTTOM_OFFSET = 50;

interface GetElemTopPositionArgs {
  /**
   * The height of the screen or viewport in pixels
   */
  screenHeight: number;
  /**
   * The y-coordinate of the element on the page.
   */
  pageY: number;
  /**
   * The height of the wrapper component containing the element.
   */
  wrapperComponentHeight: number;
  /**
   * The offset from the bottom of the wrapper component to the bottom of the screen.
   */
  wrapperBottomOffset: number;
  /**
   * The height of the element whose top position is being calculated.
   */
  elemHeight: number;
  /**
   * Additional offset to be applied to the calculated top position or bottom position.
   */
  offset: number;
}

export type VariantTypes = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export interface GetVariantArgs {
  theme: ThemeType;
  variant?: VariantTypes;
}

export const getElemTopPosition = ({
  screenHeight,
  pageY,
  wrapperComponentHeight,
  wrapperBottomOffset = WRAPPER_BOTTOM_OFFSET,
  elemHeight,
  offset = OFFSET,
}: GetElemTopPositionArgs): number => {
  const topPos =
    screenHeight <= pageY + wrapperComponentHeight + wrapperBottomOffset
      ? pageY - elemHeight - offset
      : pageY + elemHeight - offset;

  return topPos;
};

export const screenHeight = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
export const isTablet = width >= 650;

export const getVariant = ({ variant, theme }: GetVariantArgs): string => {
  if (variant === 'primary') return theme.colors.primary[500];
  else if (variant === 'secondary') return theme.colors.secondary[500];
  else if (variant === 'error') return theme.colors.red[500];
  else if (variant === 'info') return theme.colors.lightBlue[500];
  else if (variant === 'success') return theme.colors.green[500];
  else if (variant === 'warning') return theme.colors.yellow[500];
  return theme.colors.secondary[500];
};

export const maxLength = function (text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
