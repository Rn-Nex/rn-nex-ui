import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../../libraries';
import { getYears } from '../../utils';
import { Chip } from '../Chip';
import { chipItem as chipItemStyle, styles } from './DatePicker.styles';
import { YearsProps } from './DatePickerTypes';

export const Years = React.forwardRef<View, YearsProps>(({ style, chipStyles, ...props }, ref) => {
  const { theme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const years = useMemo(() => getYears(), []);

  return (
    <View style={[styles.yearsWrapperContainer]} {...props} ref={ref}>
      <FlatList
        data={years}
        keyExtractor={item => item.toString()}
        numColumns={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingVertical: 5,
        }}
        renderItem={args => (
          <Chip
            style={[{ width: '18%' }, chipItemStyle({ theme, currentYear, year: args.item }), chipStyles]}
            key={args.item}
            label={String(args.item)}
          />
        )}
      />
    </View>
  );
});
