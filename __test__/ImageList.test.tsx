import React from 'react';
import { render } from './test-utils';
import { ImageList } from '../src';
import { ScrollView, View } from 'react-native';

describe('ImageList Component', () => {
  const mockImageListTestId = 'image-list-test-id';
  const mockChildTestId = 'child-test-id';

  const mockRef = React.createRef<ScrollView>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    const { toJSON } = render(<ImageList />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<ImageList ref={mockRef} />);
    expect(mockRef.current).toBeInstanceOf(ScrollView);
    expect(mockRef.current).not.toBeNull();
  });

  it('should render the child component correctly', () => {
    const { getByTestId } = render(
      <ImageList>
        <View testID={mockChildTestId} />
      </ImageList>,
    );

    const child = getByTestId(mockChildTestId);
    expect(child).toBeDefined();
  });
});
