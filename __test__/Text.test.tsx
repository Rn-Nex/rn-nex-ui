import React from 'react';
import { Text as RnText, StyleProp, TextStyle } from 'react-native';
import { red, secondary, Text } from '../src';
import { render } from './test-utils';

describe('Text Component', () => {
  const mockTestId = 'text_mock_id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', () => {
    const { toJSON } = render(<Text>Mock</Text>);
    expect(toJSON).toMatchSnapshot();
  });

  it('should apply the sx styles', () => {
    const { getByTestId } = render(
      <Text sx={{ color: 'red', size: 20, weight: '400' }} testID={mockTestId}>
        Mock
      </Text>,
    );

    const text = getByTestId(mockTestId);
    const expectedStyles: TextStyle = { color: 'red', fontSize: 20, fontWeight: '400' };
    expect(text.props.style).toEqual(expectedStyles);
  });

  it('should render the disabled text when passed the disabled prop', () => {
    const { getByTestId } = render(
      <Text disabled testID={mockTestId}>
        Mock
      </Text>,
    );

    const text = getByTestId(mockTestId);
    const expectedStyles: StyleProp<TextStyle> = { opacity: 0.3 };
    expect(text.props.style).toEqual(expectedStyles);
  });

  it('truncates text when maxLength is provided', () => {
    const { getByText } = render(<Text maxLength={5}>Sample Text</Text>);
    expect(getByText('Sampl...')).toBeTruthy();
  });

  it('applies correct variation styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} variation="body1">
        Body1 Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ fontSize: 24 });
  });

  it('applies active state', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive activeColor="green">
        Active Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ color: 'green' });
  });

  it('applies error state', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} error>
        Error Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ color: red[600] });
  });

  it('applies light mode', () => {
    const { getByText } = render(<Text mode="light">Light Mode Text</Text>);
    const text = getByText('Light Mode Text');
    expect(text.props.style).toEqual({ color: 'white' });
  });

  it('applies custom styles via sx prop', () => {
    const customStyles = { size: 30, color: 'purple' };
    const { getByTestId } = render(
      <Text testID={mockTestId} sx={customStyles}>
        Custom Style Text
      </Text>,
    );
    const text = getByTestId(mockTestId);
    const expectedStyles: StyleProp<TextStyle> = { fontSize: 30, color: 'purple' };
    expect(text.props.style).toEqual(expectedStyles);
  });

  it('should apply the isActive prop', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive>
        is active
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ color: secondary[200] });
  });

  it('should apply the spacing bottom styles when passed the gutter prop', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ marginBottom: 10 });
  });

  it('should override the gutter style when passed the custom spacing styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom sx={{ mb: 20 }}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ marginBottom: 20 });
  });

  it('should able to adjust the gutter spacing', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} gutterBottom gutterBottomSpace={20}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ marginBottom: 20 });
  });

  it('should override the default active color when passed the custom styles', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} isActive sx={{ color: 'red' }}>
        gutter
      </Text>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual({ color: 'red' });
  });

  it('attaches the ref to the Text component', () => {
    const ref = React.createRef<RnText>();
    const { getByTestId } = render(
      <Text testID={mockTestId} ref={ref}>
        Text with ref
      </Text>,
    );

    expect(getByTestId(mockTestId)).toBeTruthy();
    expect(ref.current).toBeTruthy();
    expect(ref.current?.props.children).toBe('Text with ref');
  });

  it('should apply the custom text color', () => {
    const { getByTestId } = render(
      <Text testID={mockTestId} color={'red'}>
        Text with custom color value
      </Text>,
    );

    const text = getByTestId(mockTestId);
    expect(text).toBeTruthy();
    expect(text.props.style).toEqual({ color: 'red' });
  });

  it('should throw an error when using the maxLength prop with a non-string value', () => {
    const renderComponent = () => {
      render(
        <Text maxLength={10}>
          <></>
        </Text>,
      );
    };

    expect(renderComponent).toThrowError('maxLength props must be used with string');
  });
});
