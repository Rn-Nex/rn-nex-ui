import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ThemeProvider, grey } from '../../../libraries';
import { Chip } from '../Chip';
import { StyleProp, Text, ViewStyle } from 'react-native';

describe('Chip Component', () => {
  const chipMockTestId = 'chip_test_id';
  const chipMockLabel = 'label';
  const mockEvent = { nativeEvent: {} };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <Chip />
      </ThemeProvider>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('renders correctly with label', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} />
      </ThemeProvider>,
    );

    const labelElement = getByText(chipMockLabel);
    expect(labelElement).toBeTruthy();
  });

  it('should show the label', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} />
      </ThemeProvider>,
    );
    const chip = getByTestId(chipMockTestId);
    expect(getByText(chipMockLabel)).toBeTruthy();
    expect(chip).toBeTruthy();
  });

  it('renders startAdornment and endAdornment', () => {
    const mockStartAdornment = <Text>Start</Text>;
    const mockEndAdornment = <Text>End</Text>;

    const { getByText } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} startAdornment={mockStartAdornment} endAdornment={mockEndAdornment} />
      </ThemeProvider>,
    );

    expect(getByText('Start')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();
  });

  it('applies styles based on variant and disabled props', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} variant="outlined" disabled />
      </ThemeProvider>,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      borderColor: grey[400],
      borderRadius: 20,
      borderWidth: 1,
      opacity: 0.5,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 5,
      transform: [{ scale: 1 }],
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('renders with a custom color', () => {
    const customColor = 'red';

    const { getByTestId } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} style={{ backgroundColor: customColor }} />
      </ThemeProvider>,
    );

    const chipElement = getByTestId(chipMockTestId);

    expect(chipElement.props.style).toEqual(expect.objectContaining({ backgroundColor: customColor }));
  });

  it('should apply the chip variant', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} variant="filled" disabled />
      </ThemeProvider>,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: grey[400],
      borderRadius: 20,
      opacity: 0.5,
      overflow: 'hidden',
      paddingHorizontal: 10,
      paddingVertical: 5,
      transform: [{ scale: 1 }],
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should call the event when passed the onPress prop', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} onPress={mockOnPress} />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId(chipMockTestId), mockEvent);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should disable the onPress props when passed the disabled prop', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <Chip testID={chipMockTestId} label={chipMockLabel} onPress={mockOnPress} disabled />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId(chipMockTestId), mockEvent);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
