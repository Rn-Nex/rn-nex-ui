import React from 'react';
import {
  Switch,
  SWITCH_CONTAINER_HEIGHT_LARGE,
  SWITCH_CONTAINER_HEIGHT_MEDIUM,
  SWITCH_CONTAINER_HEIGHT_SMALL,
  SWITCH_CONTAINER_WIDTH_LARGE,
  SWITCH_CONTAINER_WIDTH_MEDIUM,
  SWITCH_CONTAINER_WIDTH_SMALL,
} from '../src';
import { fireEvent, render } from './test-utils';

describe('Switch Component', () => {
  const switchMockTestId = 'switch_test_id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot with default props', () => {
    const { toJSON } = render(<Switch />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should render with default props', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} />);
    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent).toBeTruthy();
  });

  it('should call onToggle when switch is toggled', async () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(<Switch testID={switchMockTestId} onToggle={onToggleMock} />);
    const switchComponent = getByTestId(switchMockTestId);

    fireEvent.press(switchComponent);

    expect(onToggleMock).toHaveBeenCalledWith(true);
  });

  it('should toggle off when initially on', () => {
    const onToggleMock = jest.fn();
    const { getByTestId } = render(<Switch testID={switchMockTestId} initialToggleState={true} onToggle={onToggleMock} />);
    const switchComponent = getByTestId(switchMockTestId);

    fireEvent.press(switchComponent);

    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  it('should apply the correct size for the "large" switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="large" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_LARGE);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_LARGE);
  });

  it('should apply the correct size for the "medium" switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="medium" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_MEDIUM);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_MEDIUM);
  });

  it('should apply the correct size for the "small" switch', () => {
    const { getByTestId } = render(<Switch testID={switchMockTestId} size="small" />);

    const switchComponent = getByTestId(switchMockTestId);
    expect(switchComponent.props.style.width).toBe(SWITCH_CONTAINER_WIDTH_SMALL);
    expect(switchComponent.props.style.height).toBe(SWITCH_CONTAINER_HEIGHT_SMALL);
  });
});
