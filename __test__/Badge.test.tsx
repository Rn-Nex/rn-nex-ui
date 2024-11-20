import React from 'react';
import { View } from 'react-native';
import {
  Badge,
  BADGE_BOTTOM_LEFT_POSITION,
  BADGE_BOTTOM_RIGHT_POSITION,
  BADGE_DEFAULT_RADIUS,
  BADGE_TOP_LEFT_POSITION,
  green,
  lightBlue,
  primary,
  red,
  secondary,
  yellow,
} from '../src';
import { render } from './test-utils';

describe('Badge', () => {
  const mockBadgeTestId = 'mock-badge-test-id';
  const mockRef = React.createRef<View>();
  const defaultBadgePositionSpace = -4;

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Badge />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render correctly with inner component', () => {
    const { toJSON } = render(
      <Badge>
        <View />
      </Badge>,
    );
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward the ref', () => {
    render(<Badge ref={mockRef} />);
    expect(mockRef.current).not.toBeNull();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the badge content', () => {
    const { getByText } = render(<Badge badgeContent={'100'} max={1000} />);

    const label = getByText('100');
    expect(label).toBeDefined();
  });

  it('should render the primary variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="primary" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: primary[500] }));
  });

  it('should render the secondary variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="secondary" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: secondary[500] }));
  });

  it('should render the error variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="error" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: red[500] }));
  });

  it('should render the info variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="info" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: lightBlue[500] }));
  });

  it('should render the success variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="success" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: green[500] }));
  });

  it('should render the warning variation of the badge component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variation="warning" />);

    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: yellow[500] }));
  });

  it('should render the badge dot component', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} variant="dot" />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ minWidth: BADGE_DEFAULT_RADIUS, minHeight: BADGE_DEFAULT_RADIUS }),
    );
  });

  it('should render the (+) after the badge content if the max value is less then the badge content', () => {
    const { getByText } = render(<Badge testID={mockBadgeTestId} badgeContent={100} max={100} />);
    const badgeLabel = getByText('99+');
    expect(badgeLabel).toBeTruthy();
  });

  it('should change the scale of the badge when the invisible prop is passed', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} invisible />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(expect.objectContaining({ transform: [{ scale: 0 }] }));
  });

  it('should render the badge in top right place', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ top: defaultBadgePositionSpace, right: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (START TOP) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_TOP_LEFT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ top: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (START BOTTOM) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_BOTTOM_LEFT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ bottom: defaultBadgePositionSpace, left: defaultBadgePositionSpace }),
    );
  });

  it('should change the position (END BOTTOM) of the badge when passed the anchorOrigin prop', () => {
    const { getByTestId } = render(<Badge testID={mockBadgeTestId} anchorOrigin={BADGE_BOTTOM_RIGHT_POSITION} />);
    const badge = getByTestId(mockBadgeTestId);
    expect(badge.props.style).toEqual(
      expect.objectContaining({ bottom: defaultBadgePositionSpace, right: defaultBadgePositionSpace }),
    );
  });
});
