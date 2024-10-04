import { TextStyle, ViewStyle } from 'react-native';
import { generateElementStyles, generateStyle } from '../styleGenerator';
import {
  ELementDimensionMap,
  ElementFlexStyleProps,
  ElementMargin,
  ElementPadding,
  ElementTextStyleProps,
} from '../../libraries/style/styleTypes';

describe('generateStyle', () => {
  it('should return an object with the provided property name and value', () => {
    const propertyName = 'color';
    const value = 'red';
    const result = generateStyle({ propertyName, value });
    expect(result).toEqual({ color: 'red' });
  });

  it('should return an object with the provided property name and value if value is 0', () => {
    const propertyName = 'width';
    const value = 0;
    const result = generateStyle({ propertyName, value });
    expect(result).toEqual({ [propertyName]: value });
  });

  it('should return empty object if value is undefined', () => {
    const propertyName = 'color';
    const value = undefined;
    const result = generateStyle({ propertyName, value });
    expect(result).toEqual({});
  });

  it('should return empty object if value is not provided', () => {
    const propertyName = 'color';
    const result = generateStyle({ propertyName } as any);
    expect(result).toEqual({});
  });

  it('should return an empty object when property name is missing', () => {
    const value = 'red';
    const result = generateStyle({ value } as any);
    expect(result).toEqual({});
  });

  it('should return an empty object when value is undefined', () => {
    const propertyName = 'color';
    const result = generateStyle({ propertyName } as any);
    expect(result).toEqual({});
  });

  it('should return an empty object when both property name and value are missing', () => {
    const result = generateStyle({} as any);
    expect(result).toEqual({});
  });
});

describe('generateElementStyles', () => {
  it('should generate correct styles for valid input', () => {
    const args = {
      p: 10,
      m: 20,
      color: '#FFFFFF',
      size: 16,
    };
    const expectedStyles = {
      padding: 10,
      margin: 20,
      color: '#FFFFFF',
      fontSize: 16,
    };
    expect(generateElementStyles(args)).toEqual(expectedStyles);
  });

  it('should ignore properties with undefined values', () => {
    const args = {
      p: 10,
      m: undefined,
      color: '#FFFFFF',
      size: 16,
    };
    const expectedStyles = {
      padding: 10,
      color: '#FFFFFF',
      fontSize: 16,
    };
    expect(generateElementStyles(args)).toEqual(expectedStyles);
  });

  it('should ignore properties with missing values', () => {
    const args = {
      p: 10,
      color: '#FFFFFF',
      size: 16,
    };
    const expectedStyles = {
      padding: 10,
      color: '#FFFFFF',
      fontSize: 16,
    };
    expect(generateElementStyles(args)).toEqual(expectedStyles);
  });

  it('should return empty object for empty input', () => {
    const args = {};
    const expectedStyles = {};
    expect(generateElementStyles(args)).toEqual(expectedStyles);
  });
});

describe('generateElementStyles with flex styles', () => {
  it('should apply alignContent style when provided', () => {
    const args = { align: 'center' };
    const styles = generateElementStyles(args as any);
    expect(styles.alignContent).toEqual('center');
  });

  it('should apply justifyContent style when provided', () => {
    const args = { content: 'space-around' };
    const styles = generateElementStyles(args as any);
    expect(styles.justifyContent).toEqual('space-around');
  });

  it('should apply justifyContent style correctly', () => {
    const args: ElementFlexStyleProps = { content: 'space-around' };
    const styles = generateElementStyles(args);
    expect(styles.justifyContent).toEqual('space-around');
  });

  it('should handle missing style values gracefully', () => {
    const args: ElementFlexStyleProps = {};
    const styles = generateElementStyles(args);
    expect(styles).toEqual({});
  });

  it('should return an object with styles based on the provided flex styles args', () => {
    const args: ElementFlexStyleProps = {
      align: 'center',
      content: 'space-around',
      items: 'center',
      self: 'baseline',
      ratio: 0,
      d: 'flex',
      end: 'auto',
      f: 1,
      fBasis: 'auto',
      fDirection: 'column-reverse',
      rGap: 10,
      gap: 10,
      cGap: 10,
      fGrow: 10,
      fShrink: 10,
      wrap: 'nowrap',
    };

    const styles = generateElementStyles(args);

    const expected: ViewStyle = {
      alignContent: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'baseline',
      aspectRatio: 0,
      display: 'flex',
      end: 'auto',
      flex: 1,
      flexBasis: 'auto',
      flexDirection: 'column-reverse',
      flexGrow: 10,
      rowGap: 10,
      gap: 10,
      columnGap: 10,
      flexShrink: 10,
      flexWrap: 'nowrap',
    };

    expect(styles).toEqual(expected);
  });
});

describe('generateElementStyles with text styles', () => {
  it('should apply color style when provided', () => {
    const args = { color: 'red' };
    const styles = generateElementStyles(args);
    expect(styles.color).toEqual('red');
  });

  it('should apply fontFamily style when provided', () => {
    const args = { family: 'roboto' };
    const styles = generateElementStyles(args);
    expect(styles.fontFamily).toEqual('roboto');
  });

  it('should return an object with styles based on the provided text styles args', () => {
    const args: ElementTextStyleProps = {
      color: 'red',
      family: 'roboto',
      size: 10,
      style: 'italic',
      weight: '700',
      lSpacing: 10,
      lHeight: 10,
      dLine: 'underline',
      dStyle: 'double',
      dColor: 'red',
      transform: 'uppercase',
      select: 'contain',
    };

    const styles = generateElementStyles(args);

    const expected: TextStyle = {
      color: 'red',
      fontFamily: 'roboto',
      fontSize: 10,
      fontStyle: 'italic',
      fontWeight: '700',
      letterSpacing: 10,
      lineHeight: 10,
      textDecorationLine: 'underline',
      textDecorationStyle: 'double',
      textDecorationColor: 'red',
      textTransform: 'uppercase',
      userSelect: 'contain',
    };

    expect(styles).toEqual(expected);
  });
});

describe('generateElementStyles with padding styles', () => {
  it('should apply padding style when provided', () => {
    const args = { p: 10 };
    const styles = generateElementStyles(args);
    expect(styles.padding).toEqual(10);
  });

  it('should apply paddingHorizontal style when provided', () => {
    const args = { px: 10 };
    const styles = generateElementStyles(args);
    expect(styles.paddingHorizontal).toEqual(10);
  });

  it('should return an object with styles based on the provided spacing "padding" styles args', () => {
    const args: ELementDimensionMap<ElementPadding> = {
      p: 10,
      px: 10,
      pb: 20,
      pe: 20,
      ps: 10,
      pt: 40,
      py: 50,
    };

    const styles = generateElementStyles(args);

    const expected: ViewStyle = {
      padding: 10,
      paddingHorizontal: 10,
      paddingBottom: 20,
      paddingStart: 10,
      paddingEnd: 20,
      paddingTop: 40,
      paddingVertical: 50,
    };

    expect(styles).toEqual(expected);
  });
});

describe('generateElementStyles with margin styles', () => {
  it('should apply margin style when provided', () => {
    const args = { m: 10 };
    const styles = generateElementStyles(args);
    expect(styles.margin).toEqual(10);
  });

  it('should apply marginBottom style when provided', () => {
    const args = { mb: 20 };
    const styles = generateElementStyles(args);
    expect(styles.marginBottom).toEqual(20);
  });

  it('should return an object with styles based on the provided spacing "margin" styles args', () => {
    const args: ELementDimensionMap<ElementMargin> = {
      m: 10,
      mb: 20,
      me: 20,
      ms: 20,
      mt: 10,
      mx: 10,
      my: 20,
    };

    const styles = generateElementStyles(args);

    const expected: ViewStyle = {
      margin: 10,
      marginBottom: 20,
      marginEnd: 20,
      marginStart: 20,
      marginTop: 10,
      marginHorizontal: 10,
      marginVertical: 20,
    };

    expect(styles).toEqual(expected);
  });
});

describe('generateElementStyles with mixed styles', () => {
  it('should apply multiple styles when provided', () => {
    const args = { color: 'red', align: 'center' };
    const styles = generateElementStyles(args as any);
    expect(styles.color).toEqual('red');
    expect(styles.alignContent).toEqual('center');
  });

  it('should ignore undefined styles', () => {
    const args = { color: 'red', align: undefined };
    const styles = generateElementStyles(args);
    expect(styles.color).toEqual('red');
    expect(styles.alignContent).toBeUndefined();
  });
});

describe('generateElementStyles with backface visibility style', () => {
  it('should apply backface visibility style correctly', () => {
    const args = { bVisibility: 'visible' };
    const styles = generateElementStyles(args as any);
    expect(styles.backfaceVisibility).toEqual('visible');
  });
});

describe('generateElementStyles with background color style', () => {
  it('should apply background color style correctly', () => {
    const args = { bg: 'blue' };
    const styles = generateElementStyles(args as any);
    expect(styles.backgroundColor).toEqual('blue');
  });
});

describe('generateElementStyles with opacity style', () => {
  it('should apply opacity style correctly', () => {
    const args = { o: 0.5 };
    const styles = generateElementStyles(args as any);
    expect(styles.opacity).toEqual(0.5);
  });
});

describe('generateElementStyles with elevation style', () => {
  it('should apply elevation style correctly', () => {
    const args = { e: 5 };
    const styles = generateElementStyles(args as any);
    expect(styles.elevation).toEqual(5);
  });
});

describe('generateElementStyles with pointer events style', () => {
  it('should apply pointer events style correctly', () => {
    const args = { pEvents: 'auto' };
    const styles = generateElementStyles(args as any);
    expect(styles.pointerEvents).toEqual('auto');
  });
});

describe('generateElementStyles with cursor style', () => {
  it('should apply cursor style correctly', () => {
    const args = { c: 'pointer' };
    const styles = generateElementStyles(args as any);
    expect(styles.cursor).toEqual('pointer');
  });
});
