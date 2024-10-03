import { Dimensions } from 'react-native';

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
