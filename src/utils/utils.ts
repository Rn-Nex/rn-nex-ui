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

/**
 * Groups an array of days into weeks, starting with a specific day and filling in leading/trailing zeros.
 *
 * @param days - The array of days to group into weeks.
 * @param startDay - The day of the week the month starts on (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @param endDay - The day of the week the month ends on (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @returns An array of weeks, each represented as an array of 7 days, with leading and trailing zeros as needed.
 */
export const groupDaysByWeek = (days: number[], startDay: number, endDay: number): number[][] => {
  const weeks: number[][] = [];
  const daysInWeek = 7;

  // Creates an array of leading zeros based on the start day of the month
  const leadingZeros = Array(startDay).fill(0);
  // Creates an array of trailing zeros to complete the last week
  const trailingZeros = Array(daysInWeek - ((endDay + 1) % daysInWeek)).fill(0);
  // Combines leading zeros, the days of the month, and trailing zeros into one array
  const allDays = [...leadingZeros, ...days, ...trailingZeros];

  // Groups the combined days into weeks of 7 days each
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

export const getYears = (): number[] => {
  const years = [];
  for (let i = 1900; i <= 2099; i++) {
    years.push(i);
  }
  return years;
};
