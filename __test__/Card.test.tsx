import React from 'react';
import { View } from 'react-native';
import { Card, CardContent, CardHeader, grey } from '../src';
import { render } from './test-utils';

describe('Card Component', () => {
  const mockCardTestId = 'card-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Card />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<Card ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<Card sx={mockSx} testID={mockCardTestId} />);

    const card = getByTestId(mockCardTestId);
    expect(card.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should apply the card variant (outlined)', () => {
    const { getByTestId } = render(<Card variation="outlined" testID={mockCardTestId} />);

    const card = getByTestId(mockCardTestId);
    expect(card.props.style).toEqual(expect.objectContaining({ borderWidth: 0.5, borderColor: grey[500] }));
  });
});

describe('CardHeader Component', () => {
  const mockCardHeaderTestId = 'card-header-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<CardHeader />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<CardHeader ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<CardHeader sx={mockSx} testID={mockCardHeaderTestId} />);

    const cardHeader = getByTestId(mockCardHeaderTestId);
    expect(cardHeader.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });
});

describe('CardContent Component', () => {
  const mockCardContentTestId = 'card-content-test-td';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<CardContent />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<CardContent ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles correctly', () => {
    const mockSx = { bg: 'red' };
    const { getByTestId } = render(<CardContent sx={mockSx} testID={mockCardContentTestId} />);

    const cardHeader = getByTestId(mockCardContentTestId);
    expect(cardHeader.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });
});
