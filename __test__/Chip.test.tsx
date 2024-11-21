import React from 'react';
import { Chip } from '../src';
import { SQUARE_BORDER_RADIUS } from '../src/components/Chip/constants';
import { fireEvent, render } from './test-utils';

describe('Chip Component', () => {
  const chipMockTestId = 'chip-test-id';
  const chipMockLabel = 'label';

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', () => {
    const { toJSON } = render(<Chip />);
    expect(toJSON).toMatchSnapshot();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(<Chip testID={chipMockTestId} label={chipMockLabel} />);

    const labelElement = getByText(chipMockLabel);
    expect(labelElement).toBeTruthy();
  });

  it('should show the label', () => {
    const { getByTestId, getByText } = render(<Chip testID={chipMockTestId} label={chipMockLabel} />);
    const chip = getByTestId(chipMockTestId);

    expect(getByText(chipMockLabel)).toBeTruthy();
    expect(chip).toBeTruthy();
  });

  it('should render the outlined variation of the chip component', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} variant="outlined" />);
    const chip = getByTestId(chipMockTestId);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderWidth: 1 }));
    expect(chip.props.style).not.toHaveProperty('backgroundColor');
  });

  it('should change the border of the chip component when square prop is passed', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} square />);
    const chip = getByTestId(chipMockTestId);

    expect(chip.props.style).toEqual(expect.objectContaining({ borderRadius: SQUARE_BORDER_RADIUS }));
  });

  it('should call the function when chip component is pressed', () => {
    const { getByTestId } = render(<Chip onPress={mockOnPress} testID={chipMockTestId} />);
    const chip = getByTestId(chipMockTestId);
    fireEvent.press(chip, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
