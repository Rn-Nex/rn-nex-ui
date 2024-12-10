import React from 'react';
import { render } from './test-utils';
import { Accordion, AccordionSummary, Text } from '../src';
import { View } from 'react-native';

describe('Accordion Component', () => {
  const mockAccordionTestId = 'accordion-test-id';

  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<Accordion />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<Accordion ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should change the border radius when passed the square prop', () => {
    const { getByTestId } = render(<Accordion testID={mockAccordionTestId} square />);

    const accordion = getByTestId(mockAccordionTestId);
    expect(accordion.props.style).not.toHaveProperty('borderRadius');
  });

  it('should change the opacity when passed the disable prop', () => {
    const { getByTestId } = render(<Accordion testID={mockAccordionTestId} disable />);

    const accordion = getByTestId(mockAccordionTestId);
    expect(accordion.props.style).toEqual(expect.objectContaining({ opacity: 0.5 }));
  });
});

describe('AccordionSummary Component', () => {
  const mockRef = React.createRef<View>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { toJSON } = render(<AccordionSummary />);
    expect(toJSON).toMatchSnapshot();
  });

  it('should forward ref correctly', () => {
    render(<AccordionSummary ref={mockRef} />);
    expect(mockRef.current).toBeDefined();
    expect(mockRef.current).toBeInstanceOf(View);
  });

  it('should render the icon when passed the expandIcon prop', () => {
    const { getByText } = render(<AccordionSummary expandIcon={<Text>expandIcon</Text>} />);

    const expandIcon = getByText('expandIcon');
    expect(expandIcon).toBeDefined();
  });
});
