import React from 'react';
import { render } from './test-utils';
import { Divider, Text } from '../src';
import { View } from 'react-native';
import { spacing } from '../src/libraries/themes/v1/sizes';

describe('Divider Component', () => {
  const dividerMockTestId = 'divide-test-id';
  const dividerStartLineTestId = 'divide-start-line-test-id';
  const dividerEndLineTestId = 'divide-end-line-test-id';

  const mockTestLabel = 'test-label';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<Divider ref={mockRef} />);

    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the children correctly', () => {
    const { toJSON, getByText } = render(
      <Divider ref={mockRef}>
        <Text>{mockTestLabel}</Text>
      </Divider>,
    );

    const text = getByText(mockTestLabel);

    expect(toJSON).toMatchSnapshot();
    expect(text).toBeTruthy();
  });

  it('should add the start spacing when passed the variant (startSpacing)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: spacing.lg }));
  });

  it('should add the end spacing when passed the variant (endSpacing)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="endSpacing" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingRight: spacing.lg }));
  });

  it('should add the start and end spacing when passed the variant (middle)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="middle" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingHorizontal: spacing.lg }));
  });

  it('should remove the start and end spacing when passed the variant (fullWidth)', () => {
    const { getByTestId } = render(<Divider ref={mockRef} testID={dividerMockTestId} variant="fullWidth" />);

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).not.toHaveProperty('paddingHorizontal');
    expect(divider.props.style).not.toHaveProperty('paddingRight');
    expect(divider.props.style).not.toHaveProperty('paddingLeft');
  });

  it('should change the border of the divider component when passed the borderColor prop', () => {
    const { getByTestId } = render(
      <Divider startLineTestId={dividerStartLineTestId} endLineTestId={dividerEndLineTestId} borderColor="red" />,
    );
    const startLine = getByTestId(dividerStartLineTestId);
    const endLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
    expect(endLine.props.style).toEqual(expect.objectContaining({ borderColor: 'red' }));
  });

  it('should change the variant spacing of the divider component when passed the variantSpacing prop', () => {
    const { getByTestId } = render(
      <Divider ref={mockRef} testID={dividerMockTestId} variant="startSpacing" variantSpacing={20} />,
    );

    const divider = getByTestId(dividerMockTestId);
    expect(divider.props.style).toEqual(expect.objectContaining({ paddingLeft: 20 }));
  });

  it('should apply the dynamic style into the start line element', () => {
    const { getByTestId } = render(
      <Divider startLineTestId={dividerStartLineTestId} startLineStyles={{ backgroundColor: 'red' }} />,
    );

    const startLine = getByTestId(dividerStartLineTestId);
    expect(startLine.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the dynamic style into the end line element', () => {
    const { getByTestId } = render(<Divider endLineTestId={dividerEndLineTestId} endLineStyles={{ backgroundColor: 'red' }} />);

    const endLine = getByTestId(dividerEndLineTestId);
    expect(endLine.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });
});
