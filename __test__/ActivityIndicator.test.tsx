import { render } from '@testing-library/react-native';
import React from 'react';
import { ActivityIndicator as RnActivityIndicator } from 'react-native';
import { ActivityIndicator } from '../src';

describe('ActivityIndicator', () => {
  const mockActivityIndicatorTestId = 'mock-activity-indicator-test-id';
  const mockRef = React.createRef<RnActivityIndicator>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<ActivityIndicator />);
    expect(toJSON).toBeDefined();
  });

  it('should render the large size indicator', () => {
    const { getByTestId } = render(<ActivityIndicator testID={mockActivityIndicatorTestId} size="large" />);
    const indicator = getByTestId(mockActivityIndicatorTestId);
    expect(indicator.props.size).toBe('large');
  });

  it('should render the small size indicator', () => {
    const { getByTestId } = render(<ActivityIndicator testID={mockActivityIndicatorTestId} size="small" />);
    const indicator = getByTestId(mockActivityIndicatorTestId);
    expect(indicator.props.size).toBe('small');
  });

  it('should render the custom color indicator', () => {
    const { getByTestId } = render(<ActivityIndicator testID={mockActivityIndicatorTestId} color="red" />);
    const indicator = getByTestId(mockActivityIndicatorTestId);
    expect(indicator.props.color).toBe('red');
  });

  it('should forward ref to the underlying ActivityIndicator', () => {
    render(<ActivityIndicator ref={mockRef} />);
    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(Object);
  });
});
