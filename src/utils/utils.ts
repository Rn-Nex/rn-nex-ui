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

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const groupDaysByWeek = (days: number[], startDay: number, endDay: number): number[][] => {
  const weeks: number[][] = [];
  const daysInWeek = 7;
  const leadingZeros = Array(startDay).fill(0);
  const trailingZeros = Array(daysInWeek - ((endDay + 1) % daysInWeek)).fill(0);
  const allDays = [...leadingZeros, ...days, ...trailingZeros];

  for (let i = 0; i < allDays.length; i += daysInWeek) {
    weeks.push(allDays.slice(i, i + daysInWeek));
  }

  return weeks;
};

export const getStartDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getEndDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, getDaysInMonth(month, year)).getDay();
};
