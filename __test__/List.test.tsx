import React from 'react';
import { fireEvent, render } from './test-utils';
import { grey, List, ListItem, ListItemText, Text } from '../src';
import { View } from 'react-native';
import { BaseStyles } from '../src/libraries/style/styleTypes';
import { BOTTOM_LARGE_SPACING, BOTTOM_MEDIUM_SPACING, BOTTOM_SMALL_SPACING } from '../src/components/List/constants';

describe('List Component', () => {
  const mockListTestId = 'list-test-id';
  const mockSubHeaderContainerTestId = 'sub-header-container-test-id';
  const mockSubHeaderTestId = 'sub-header-test-id';
  const mockSubHeader = 'mock-sub-header';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<List />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render the child component', () => {
    const { toJSON } = render(
      <List>
        <Text>Mock</Text>
      </List>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward the ref correctly', () => {
    render(<List ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should apply the sx styles', () => {
    const mockSx: BaseStyles = { bg: 'red', r: 10 };
    const { getByTestId } = render(<List sx={mockSx} testID={mockListTestId} />);

    const list = getByTestId(mockListTestId);
    expect(list.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red', borderRadius: 10 }));
  });

  it('should render the sub header if passed the subHeader prop', () => {
    const { getByText } = render(<List subheader={mockSubHeader} />);

    const subHeader = getByText(mockSubHeader);
    expect(subHeader).toBeDefined();
  });

  it('should customize the sub header container styles when passed the subheaderContainerStyles prop', () => {
    const { getByTestId } = render(
      <List
        subheader={mockSubHeader}
        subheaderContainerStyles={{ backgroundColor: 'red' }}
        subHeaderContainerTestId={mockSubHeaderContainerTestId}
      />,
    );

    const subHeaderContainer = getByTestId(mockSubHeaderContainerTestId);
    expect(subHeaderContainer.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should customize the sub header when passed the subheaderProps', () => {
    const { getByTestId } = render(
      <List subheaderProps={{ testID: mockSubHeaderTestId, style: { color: 'red' } }} subheader={mockSubHeader} />,
    );

    const subHeader = getByTestId(mockSubHeaderTestId);
    expect(subHeader.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });
});

describe('ListItem Component', () => {
  const mockListItemTestId = 'list-item-test-id';
  const mockListItemContainerTestId = 'list-item-container-test-id';

  const mockRef = React.createRef<View>();
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<ListItem />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward the ref correctly', () => {
    render(<ListItem ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the child component', () => {
    const { toJSON } = render(
      <ListItem>
        <Text>Mock</Text>
      </ListItem>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('should apply the list item container styles', () => {
    const { getByTestId } = render(
      <ListItem listItemContainerTestId={mockListItemContainerTestId} listContainerStyles={{ backgroundColor: 'red' }} />,
    );

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should render the end adornment correctly', () => {
    const { getByText } = render(<ListItem endAdornment={<Text>adornment</Text>} />);

    const adornment = getByText('adornment');
    expect(adornment).toBeDefined();
  });

  it('should render the start adornment correctly', () => {
    const { getByText } = render(<ListItem startAdornment={<Text>adornment</Text>} />);

    const adornment = getByText('adornment');
    expect(adornment).toBeDefined();
  });

  it('should apply the active color on the selected item when passed the selected prop', () => {
    const { getByTestId } = render(<ListItem listItemContainerTestId={mockListItemContainerTestId} selected />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ backgroundColor: grey[100] }));
  });

  it('should apply the active custom color on the selected item when passed the selected and selectedColor props', () => {
    const { getByTestId } = render(
      <ListItem selectedColor={'red'} listItemContainerTestId={mockListItemContainerTestId} selected />,
    );

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ backgroundColor: 'red' }));
  });

  it('should disable the bottom spacing when passed the disableBottomSpacing prop', () => {
    const { getByTestId } = render(<ListItem disableBottomSpacing listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ marginBottom: 'auto' }));
  });

  it('should apply the bottom spacing when bottomSpacingType is (small)', () => {
    const { getByTestId } = render(<ListItem bottomSpacingType="small" listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ marginBottom: BOTTOM_SMALL_SPACING }));
  });

  it('should apply the bottom spacing when bottomSpacingType is (medium)', () => {
    const { getByTestId } = render(<ListItem bottomSpacingType="medium" listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ marginBottom: BOTTOM_MEDIUM_SPACING }));
  });

  it('should apply the bottom spacing when bottomSpacingType is (large)', () => {
    const { getByTestId } = render(<ListItem bottomSpacingType="large" listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ marginBottom: BOTTOM_LARGE_SPACING }));
  });

  it('should apply the outline when showOutline prop is passed', () => {
    const { getByTestId } = render(<ListItem showOutline listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ borderColor: grey[400] }));
  });

  it('should apply the outline width when outlineWidth prop is passed', () => {
    const { getByTestId } = render(
      <ListItem showOutline outlineWidth={2} listItemContainerTestId={mockListItemContainerTestId} />,
    );

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ borderColor: grey[400], borderWidth: 2 }));
  });

  it('should apply the outline color when outlineColor prop is passed', () => {
    const { getByTestId } = render(
      <ListItem showOutline outlineWidth={2} outlineColor={'red'} listItemContainerTestId={mockListItemContainerTestId} />,
    );

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ borderWidth: 2, borderColor: 'red' }));
  });

  it('should apply the grey color when showDefaultBg prop is passed', () => {
    const { getByTestId } = render(<ListItem showDefaultBg listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ backgroundColor: grey[50] }));
  });

  it('should apply the soft border radius when softRadius prop passed', () => {
    const { getByTestId } = render(<ListItem softRadius listItemContainerTestId={mockListItemContainerTestId} />);

    const listItem = getByTestId(mockListItemContainerTestId);
    expect(listItem.props.style).toEqual(expect.objectContaining({ borderRadius: 10 }));
  });

  it('should called the onPress function when clicked on the list item', () => {
    const { getByTestId } = render(<ListItem onPress={mockOnPress} testID={mockListItemTestId} />);

    const listItem = getByTestId(mockListItemTestId);
    fireEvent.press(listItem, { nativeEvent: {} });
    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("should't called the onPress function when list item is disabled", () => {
    const { getByTestId } = render(<ListItem disabled onPress={mockOnPress} testID={mockListItemTestId} />);

    const listItem = getByTestId(mockListItemTestId);
    fireEvent.press(listItem, { nativeEvent: {} });
    expect(mockOnPress).not.toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(0);
  });
});

describe('ListItemText Component', () => {
  const mockListItemTextTestId = 'list-item-text-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<ListItemText />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward the ref correctly', () => {
    render(<ListItemText ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the primary text', () => {
    const { getByText } = render(<ListItemText primary="primary" />);

    const primary = getByText('primary');
    expect(primary).toBeDefined();
  });

  it('should render the secondary text', () => {
    const { getByText } = render(<ListItemText secondary="secondary" />);

    const secondary = getByText('secondary');
    expect(secondary).toBeDefined();
  });

  it('should apply the primary styles when passed primaryLabelStyles prop', () => {
    const { getByText } = render(<ListItemText primaryLabelStyles={{ color: 'red' }} primary="primary" />);

    const primary = getByText('primary');
    expect(primary.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should apply the primary styles when passed secondaryLabelStyles prop', () => {
    const { getByText } = render(<ListItemText secondaryLabelStyles={{ color: 'red' }} secondary="secondary" />);

    const secondary = getByText('secondary');
    expect(secondary.props.style).toEqual(expect.objectContaining({ color: 'red' }));
  });

  it('should remove the padding when passed the disableLeftPadding prop', () => {
    const { getByTestId } = render(<ListItemText testID={mockListItemTextTestId} primary="primary" disableLeftPadding />);

    const listItemTextContainer = getByTestId(mockListItemTextTestId);
    expect(listItemTextContainer.props.style).not.toHaveProperty('paddingLeft');
  });
});
