import React from 'react';
import { View } from 'react-native';
import { TextField } from '../src';
import { render } from './test-utils';

describe('TextField Component', () => {
  const mockTextFiledTestId = 'text-filed-test-id';
  const mockTextFiledValue = 'text-filed-value';
  const mockTextFiledInputLabelTestId = 'text-filed-input-label-test-id';
  const mockTextFiledPlaceholder = 'text-filed-placeholder';
  const mockTextFieldOutlineTestId = 'text-outline-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<TextField />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render the input value correctly', () => {
    const { getByTestId } = render(<TextField value={mockTextFiledValue} testID={mockTextFiledTestId} />);
    const input = getByTestId(mockTextFiledTestId);
    expect(input.props.value).toBe(mockTextFiledValue);
  });

  it('should forward ref correctly', () => {
    render(<TextField ref={mockRef} testID={mockTextFiledTestId} />);
    expect(mockRef.current).toBeInstanceOf(View);
    expect(mockRef.current).toBeDefined();
  });

  it("should't render the animated placeholder when passed the hide label prop", () => {
    jest.useFakeTimers();
    const { queryByTestId } = render(<TextField hideLabel inputLabelProps={{ testID: mockTextFiledInputLabelTestId }} />);

    expect(queryByTestId(mockTextFiledInputLabelTestId)).toBeNull();
    jest.useRealTimers();
  });

  it('should change the default placeholder when passed the placeholder prop', () => {
    jest.useFakeTimers();
    const { getByPlaceholderText } = render(<TextField hideLabel placeholder={mockTextFiledPlaceholder} />);

    const placeHolderElem = getByPlaceholderText(mockTextFiledPlaceholder);
    expect(placeHolderElem).toBeDefined();
    expect(placeHolderElem.props.placeholder).toEqual(mockTextFiledPlaceholder);
    jest.useRealTimers();
  });

  it('should apply the dynamic sx styles', () => {
    const { getByTestId } = render(
      <TextField outlineContainerTestId={mockTextFieldOutlineTestId} sx={{ bWidth: 10, bColor: 'red' }} />,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });

  it('should apply the dynamic styles', () => {
    const { getByTestId } = render(
      <TextField outlineContainerTestId={mockTextFieldOutlineTestId} style={{ borderWidth: 10, borderColor: 'red' }} />,
    );
    const outline = getByTestId(mockTextFieldOutlineTestId);
    expect(outline.props.style).toEqual(expect.objectContaining({ borderWidth: 10, borderColor: 'red' }));
  });
});
