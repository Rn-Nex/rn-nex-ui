import React from 'react';
import { fireEvent, render } from './test-utils';
import { Pagination, Text } from '../src';
import { View } from 'react-native';

describe('Pagination Component', () => {
  const mockPaginationItemTestId = 'pagination-item-test-id';
  const mockDotContainerTestId = 'dot-container-test-id';

  const mockRef = React.createRef<View>();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Pagination count={10} />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<Pagination count={10} ref={mockRef} />);

    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should call the onPageChange function when clicked on the pagination item', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(
      <Pagination count={10} onPageChange={mockOnPageChange} paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    fireEvent.press(firstItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(1);

    const SecondItem = getByTestId(`${mockPaginationItemTestId}-2`);
    fireEvent.press(SecondItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(2);

    const ThirdItem = getByTestId(`${mockPaginationItemTestId}-3`);
    fireEvent.press(ThirdItem, { nativeEvent: {} });
    expect(mockOnPageChange).toHaveBeenCalled();
    expect(mockOnPageChange).toHaveBeenCalledTimes(3);
    jest.useRealTimers();
  });

  it('should apply the dot container styles', () => {
    const { getByTestId } = render(
      <Pagination count={10} dotContainerProps={{ style: { backgroundColor: 'red' }, testID: mockDotContainerTestId }} />,
    );

    const dotContainer = getByTestId(mockDotContainerTestId);
    expect(dotContainer.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it("should't call the onPageChange function when clicked on the pagination item", () => {
    const { getByTestId } = render(
      <Pagination
        count={10}
        disabled
        onPageChange={mockOnPageChange}
        paginationItemProps={{ testID: mockPaginationItemTestId }}
      />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    fireEvent.press(firstItem, { nativeEvent: {} });
    expect(mockOnPageChange).not.toHaveBeenCalled();
    expect(mockOnPageChange).not.toHaveBeenCalledTimes(1);
  });

  it('should render the custom renderItem', () => {
    const { getAllByText } = render(<Pagination count={10} renderItem={<Text>Mock</Text>} />);
    const text = getAllByText('Mock');
    expect(text).toBeDefined();
  });

  it('should change the pagination item shape when passed the itemShape (rounded)', () => {
    const { getByTestId } = render(
      <Pagination count={10} itemShape="rounded" paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 5 }));
  });

  it('should change the pagination item shape when passed the itemShape (circular)', () => {
    const { getByTestId } = render(
      <Pagination count={10} itemShape="circular" paginationItemProps={{ testID: mockPaginationItemTestId }} />,
    );

    const firstItem = getByTestId(`${mockPaginationItemTestId}-1`);
    expect(firstItem.props.style).toEqual(expect.objectContaining({ borderRadius: 100 }));
  });
});
