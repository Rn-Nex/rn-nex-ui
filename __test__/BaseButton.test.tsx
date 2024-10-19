import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { BaseButton } from '../src';

describe('Base button component', () => {
  const mockTestId = 'base_button_mock_test_id';

  const mockOnLayout = jest.fn();
  const mockOnPress = jest.fn();
  const mockOnLongPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<BaseButton />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render child components correctly', () => {
    const { toJSON } = render(
      <BaseButton>
        <Text />
      </BaseButton>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('should call the onLayout function when onLayout function prop passed', () => {
    const { getByTestId } = render(<BaseButton onLayout={mockOnLayout} testID={mockTestId} />);
    fireEvent(getByTestId(mockTestId), 'layout', { nativeEvent: {} });
    expect(mockOnLayout).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onPress or onLongPress when disabled', () => {
    const { getByTestId } = render(
      <BaseButton testID={mockTestId} onPress={mockOnPress} onLongPress={mockOnLongPress} disabled />,
    );

    fireEvent.press(getByTestId(mockTestId));
    fireEvent(getByTestId(mockTestId), 'longPress');

    expect(mockOnPress).not.toHaveBeenCalled();
    expect(mockOnLongPress).not.toHaveBeenCalled();
  });

  it('should have initial scale value of 1', () => {
    const { getByTestId } = render(<BaseButton testID={mockTestId} />);
    const animatedView = getByTestId(mockTestId);

    expect(animatedView.props.style.transform[0].scale).toEqual(1);
  });
});
