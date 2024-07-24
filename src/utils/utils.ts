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

/**
 * Returns an array of weeks for the month and year of the provided date,
 * each represented as an array of 7 days, with leading and trailing zeros as needed.
 *
 * @param date - The date from which to extract the month and year.
 * @returns An array of weeks, each represented as an array of 7 days, with leading and trailing zeros as needed.
 */
export const getWeeksForDate = (date: Date): number[][] => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const endDay = new Date(year, month, daysInMonth).getDay();

  const totalDays = startDay + daysInMonth + (6 - endDay);
  const weeks: number[][] = [];
  let week: number[] = new Array(7).fill(0);

  for (let i = 0; i < totalDays; i++) {
    const day = i - startDay + 1;
    week[i % 7] = day > 0 && day <= daysInMonth ? day : 0;

    if ((i + 1) % 7 === 0) {
      weeks.push(week);
      week = new Array(7).fill(0);
    }
  }

  return weeks;
};

export const getYears = (): number[] => {
  const years = [];
  for (let i = 1900; i <= 2099; i++) {
    years.push(i);
  }
  return years;
};
