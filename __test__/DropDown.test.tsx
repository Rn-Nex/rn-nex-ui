import React from 'react';
import { render } from './test-utils';
import { DropDown, Text } from '../src';

describe('DropDown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<DropDown />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render the inputStartAdornment component correctly', () => {
    const label = 'inputStartAdornmentComponent';
    const { getByText } = render(<DropDown inputStartAdornment={<Text>{label}</Text>} />);
    const inputStartAdornment = getByText(label);
    expect(inputStartAdornment).toBeDefined();
  });

  it('should render the inputEndAdornment component correctly', () => {
    const label = 'inputEndAdornmentComponent';
    const { getByText } = render(<DropDown inputEndAdornment={<Text>{label}</Text>} />);
    const inputEndAdornment = getByText(label);
    expect(inputEndAdornment).toBeDefined();
  });

  it('should change the input placeholder', () => {
    jest.useFakeTimers();
    const placeholderText = 'mockPlaceHolder';
    const { getByPlaceholderText } = render(<DropDown placeholder={placeholderText} />);

    const placeholder = getByPlaceholderText(placeholderText);
    expect(placeholder).toBeDefined();
    jest.useRealTimers();
  });
});
