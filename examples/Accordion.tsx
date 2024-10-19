import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Text, useTheme } from '../src';

export const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        w: '100%',
        h: '100%',
        d: 'flex',
        items: 'center',
        content: 'center',
        p: 10,
        bg: theme.colors.grey[800],
      }}>
      <Accordion square>
        <AccordionSummary
          bottomBorder
          expandIcon={<Text>d</Text>}
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 1</Text>
        </AccordionSummary>
        <AccordionSummary
          expandIcon={<Text>d</Text>}
          accordionDetails={
            <AccordionDetails>
              <Text variation="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam expedita, aut aspernatur odio fugiat harum
                temporibus inventore asperiores eaque sunt.
              </Text>
            </AccordionDetails>
          }>
          <Text>Accordion 2</Text>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
};
