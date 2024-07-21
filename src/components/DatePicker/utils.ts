import { ViewStyle } from 'react-native';
import { WRAPPER_BOTTOM_OFFSET, WRAPPER_DEFAULT_HEIGHT } from './constants';
import { getElemTopPosition, screenHeight } from '../../utils';
import { DatePickerAnimatedViewStylesProps } from './DatePickerTypes';

export const datePickerAnimatedViewStyles = ({
  datePickerRectMeasurePos,
  animatedRect,
}: DatePickerAnimatedViewStylesProps): ViewStyle => {
  const styles: ViewStyle = {};

  if (!datePickerRectMeasurePos) {
    return styles;
  }

  const { height: elemHeight, pageY } = datePickerRectMeasurePos;
  const wrapperComponentHeight = animatedRect?.height || WRAPPER_DEFAULT_HEIGHT;

  const topPos = getElemTopPosition({
    screenHeight,
    pageY,
    elemHeight,
    wrapperComponentHeight,
    wrapperBottomOffset: WRAPPER_BOTTOM_OFFSET,
    offset: 0,
  });

  styles.position = 'absolute';
  styles.width = '100%';
  styles.top = topPos;
  styles.paddingHorizontal = 10;
  return styles;
};
