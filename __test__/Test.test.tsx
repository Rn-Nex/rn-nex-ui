import { render } from '@testing-library/react-native';
import React from 'react';
import { StyleProp, Text as RnText, TextStyle } from 'react-native';
import { red, secondary, Text, ThemeProvider } from '../src';

describe('Text Component', () => {
  const mockTestId = 'text_mock_id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <Text>Mock</Text>
      </ThemeProvider>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('should apply the sx styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text sx={{ color: 'red', size: 20, weight: '400' }} testID={mockTestId}>
          Mock
        </Text>
      </ThemeProvider>,
    );

    const text = getByTestId(mockTestId);
    const expectedStyles: StyleProp<TextStyle> = [{ color: 'red', fontSize: 20, fontWeight: '400' }];
    expect(text.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('should render the disabled text when passed the disabled prop', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text disabled testID={mockTestId}>
          Mock
        </Text>
      </ThemeProvider>,
    );

    const text = getByTestId(mockTestId);
    const expectedStyles: StyleProp<TextStyle> = [{ opacity: 0.3 }];
    expect(text.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('truncates text when maxLength is provided', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Text maxLength={5}>Sample Text</Text>
      </ThemeProvider>,
    );
    expect(getByText('Sampl...')).toBeTruthy();
  });

  it('applies correct variation styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} variation="body1">
          Body1 Text
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ fontSize: 24 }]));
  });

  it('applies active state', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} isActive activeColor="green">
          Active Text
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ color: 'green' }]));
  });

  it('applies error state', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} error>
          Error Text
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ color: red[600] }]));
  });

  it('applies light and dark themes', () => {
    const { getByText } = render(
      <ThemeProvider mode="dark">
        <Text>Dark Mode Text</Text>
      </ThemeProvider>,
    );
    const text = getByText('Dark Mode Text');
    expect(text.props.style).toEqual(expect.arrayContaining([{ color: 'white' }]));
  });

  it('applies custom styles via sx prop', () => {
    const customStyles = { size: 30, color: 'purple' };
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} sx={customStyles}>
          Custom Style Text
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    const expectedStyles: StyleProp<TextStyle> = [{ fontSize: 30, color: 'purple' }];
    expect(text.props.style).toEqual(expect.arrayContaining(expectedStyles));
  });

  it('should apply the isActive prop', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} isActive>
          is active
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ color: secondary[200] }]));
  });

  it('should apply the spacing bottom styles when passed the gutter prop', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} gutterBottom>
          gutter
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ marginBottom: 10 }]));
  });

  it('should override the gutter style when passed the custom spacing styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} gutterBottom sx={{ mb: 20 }}>
          gutter
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ marginBottom: 20 }]));
  });

  it('should override the default active color when passed the custom styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} isActive sx={{ color: 'red' }}>
          gutter
        </Text>
      </ThemeProvider>,
    );
    const text = getByTestId(mockTestId);
    expect(text.props.style).toEqual(expect.arrayContaining([{ color: 'red' }]));
  });

  it('attaches the ref to the Text component', () => {
    const ref = React.createRef<RnText>();
    const { getByTestId } = render(
      <ThemeProvider>
        <Text testID={mockTestId} ref={ref}>
          Text with ref
        </Text>
      </ThemeProvider>,
    );

    expect(getByTestId(mockTestId)).toBeTruthy();
    expect(ref.current).toBeTruthy();
    expect(ref.current?.props.children).toBe('Text with ref');
  });
});
