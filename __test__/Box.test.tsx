import { render } from '@testing-library/react-native';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Box, Text, ThemeProvider } from '../src';
import { BaseStyles } from '../src/libraries/style/styleTypes';

describe('Box Component', () => {
  const ref = React.createRef<View>();
  const mockTestId = 'mock_box';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const { toJSON } = render(<Box sx={{ bg: 'red', r: 10, w: 20, h: 20 }} />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should match the snapshot with sx styles', () => {
    const sx = { bg: 'red', p: 10, r: 5 };
    const { toJSON } = render(
      <Box sx={sx}>
        <View />
      </Box>,
    );

    expect(toJSON).toMatchSnapshot();
  });

  it('should match the snapshot with custom styles', () => {
    const customStyle = { backgroundColor: 'blue', padding: 20 };
    const { toJSON } = render(
      <Box style={customStyle}>
        <View />
      </Box>,
    );

    expect(toJSON).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Box testID={mockTestId} />);
    expect(getByTestId(mockTestId)).toBeTruthy();
  });

  it('should apply the custom styles when style prop is passed', () => {
    const styles: ViewStyle = { backgroundColor: 'red', borderRadius: 10, margin: 10, padding: 20 };
    const { getByTestId } = render(<Box testID={mockTestId} style={styles} />);
    const box = getByTestId(mockTestId);
    expect(box.props.style).toContain(styles);
  });

  it('should apply the sx styles when sx prop is passed', () => {
    const sx: BaseStyles = { bg: 'red', r: 10, m: 10, p: 20 };
    const { getByTestId } = render(<Box testID={mockTestId} sx={sx} />);
    const box = getByTestId(mockTestId);
    const generatedStyles: ViewStyle = { backgroundColor: 'red', borderRadius: 10, margin: 10, padding: 20 };
    expect(box.props.style).toEqual(expect.arrayContaining([expect.objectContaining(generatedStyles)]));
  });

  it('should combine the sx and styles props correctly', () => {
    const mockSx: BaseStyles = { bg: 'red', r: 10, m: 10, p: 20 };
    const mockStyles: ViewStyle = { backgroundColor: 'pink', borderRadius: 30 };

    const { getByTestId } = render(<Box testID={mockTestId} sx={mockSx} style={mockStyles} />);
    const box = getByTestId(mockTestId);

    const expectedStyles: StyleProp<ViewStyle> = [
      { backgroundColor: 'red', borderRadius: 10, margin: 10, padding: 20 },
      { backgroundColor: 'pink', borderRadius: 30 },
    ];

    expect(box.props.style).toEqual(expectedStyles);
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Box testID={mockTestId}>
        <ThemeProvider>
          <Text>Child Text</Text>
        </ThemeProvider>
      </Box>,
    );
    expect(getByText('Child Text')).toBeTruthy();
  });

  it('should forward ref correctly', () => {
    render(
      <Box ref={ref}>
        <View />
      </Box>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(View);
  });

  it('should position child elements correctly', () => {
    const { getByTestId } = render(<Box testID={mockTestId} style={{ flexDirection: 'row', display: 'flex' }} />);
    const box = getByTestId(mockTestId);
    expect(box.props.style).toEqual(expect.arrayContaining([{ flexDirection: 'row', display: 'flex' }]));
  });
});
