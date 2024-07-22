import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../../libraries';
import { Chip } from '../Chip';
import { chipItem as chipItemStyle, styles } from './DatePicker.styles';
import { useDatePickerContext } from './DatePickerContext';
import { YearsProps } from './DatePickerTypes';

export const Years = React.forwardRef<View, YearsProps>(({ style, chipProps, ...props }, ref) => {
  const { theme } = useTheme();
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const { dateCalendarRect } = useDatePickerContext();
  const { years } = useDatePickerContext();

  return (
    <View style={[styles.yearsWrapperContainer]} {...props} ref={ref}>
      {!!dateCalendarRect && dateCalendarRect?.width ? (
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
              style={[{ width: dateCalendarRect?.width / 5.5 }, chipItemStyle({ theme, currentYear, year: args.item })]}
              key={args.item}
              label={String(args.item)}
              {...chipProps}
            />
          )}
        />
      ) : null}
    </View>
  );
});
