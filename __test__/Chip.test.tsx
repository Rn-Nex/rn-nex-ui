import React from 'react';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { Chip, green, grey, lightBlue, primary, red, secondary, yellow } from '../src';
import { fireEvent, render } from './test-utils';

describe('Chip Component', () => {
  const chipMockTestId = 'chip_test_id';
  const chipWrapperMockTestId = 'chip_wrapper_test_id';
  const chipLabelTestId = 'chip_label_test_id';
  const chipMockLabel = 'label';
  const mockEvent = { nativeEvent: {} };

  const chipBaseStyles: StyleProp<ViewStyle> = {
    borderRadius: 20,
    opacity: 0.5,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    transform: [{ scale: 1 }],
  };

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

  it('renders startAdornment and endAdornment', () => {
    const mockStartAdornment = <Text>Start</Text>;
    const mockEndAdornment = <Text>End</Text>;

    const { getByText } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} startAdornment={mockStartAdornment} endAdornment={mockEndAdornment} />,
    );

    expect(getByText('Start')).toBeTruthy();
    expect(getByText('End')).toBeTruthy();
  });

  it('applies styles based on variant and disabled props', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} variant="outlined" disabled />);

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      borderColor: grey[400],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('renders with a custom color', () => {
    const customColor = 'red';

    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} style={{ backgroundColor: customColor }} />,
    );

    const chipElement = getByTestId(chipMockTestId);

    expect(chipElement.props.style).toEqual(expect.objectContaining({ backgroundColor: customColor }));
  });

  it('should apply the chip (filled) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} variant="filled" disabled />);

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: grey[400],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (error) variant', () => {
    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} color="error" variant="filled" disabled />,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: red[500],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (info) variant', () => {
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} color="info" variant="filled" disabled />);

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: lightBlue[500],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (primary) variant', () => {
    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} color="primary" variant="filled" disabled />,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: primary[500],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (secondary) variant', () => {
    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} color="secondary" variant="filled" disabled />,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: secondary[500],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (success) variant', () => {
    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} color="success" variant="filled" disabled />,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: green[500],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should apply the chip color (warning) variant', () => {
    const { getByTestId } = render(
      <Chip testID={chipMockTestId} label={chipMockLabel} color="warning" variant="filled" disabled />,
    );

    const chipElement = getByTestId(chipMockTestId);
    const expectedStyles: StyleProp<ViewStyle> = {
      backgroundColor: yellow[400],
      ...chipBaseStyles,
    };

    expect(chipElement.props.style).toEqual(expect.objectContaining(expectedStyles));
  });

  it('should call the event when passed the onPress prop', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} onPress={mockOnPress} />);
    fireEvent.press(getByTestId(chipMockTestId), mockEvent);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('should disable the onPress props when passed the disabled prop', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<Chip testID={chipMockTestId} label={chipMockLabel} onPress={mockOnPress} disabled />);
    fireEvent.press(getByTestId(chipMockTestId), mockEvent);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should apply the custom styles on chip wrapper', () => {
    const styles: ViewStyle = { backgroundColor: 'red' };

    const { getByTestId } = render(<Chip chipWrapperContainerProps={{ style: styles, testID: chipWrapperMockTestId }} />);

    const chipWrapper = getByTestId(chipWrapperMockTestId);
    expect(chipWrapper).toBeTruthy();

    expect(chipWrapper.props.style).toEqual(expect.arrayContaining([styles]));
  });

  it('should apply the custom text styles', () => {
    const styles: TextStyle = { color: 'red' };
    const { getByTestId } = render(<Chip labelContainerProps={{ style: styles, testID: chipLabelTestId }} />);

    const label = getByTestId(chipLabelTestId);
    expect(label.props.style).toEqual(expect.arrayContaining([styles]));
  });
});
