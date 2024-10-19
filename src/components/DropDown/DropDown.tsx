import React, { useEffect, useRef } from 'react';
import { Animated, FlatList, FlatListProps, View, ViewProps } from 'react-native';
import { useTheme } from '../../libraries';
import { IconInput, IconInputProps } from '../TextField';
import { styles } from './DropDown.styles';

export interface DropDownListContainerProps<T>
  extends ViewProps,
    Pick<FlatListProps<T>, 'data' | 'renderItem' | 'keyExtractor' | 'horizontal' | 'getItem' | 'collapsable' | 'numColumns'> {
  open?: boolean;
  maxHeight?: number;
}
export interface DropDownProps<T>
  extends React.ComponentPropsWithRef<typeof View>,
    DropDownListContainerProps<T>,
    Pick<IconInputProps, 'onChange' | 'onChangeText' | 'onFocus' | 'onBlur'> {
  inputStartAdornment?: React.ReactNode;
  inputEndAdornment?: React.ReactNode;
  placeholder?: string;
  iconInputProps?: IconInputProps;
  listContainerProps?: Omit<DropDownListContainerProps<T>, 'open'>;
}

export const DropDown = <T,>({
  open = false,
  inputEndAdornment,
  inputStartAdornment,
  iconInputProps,
  listContainerProps,
  style,
  maxHeight,
  data,
  renderItem,
  keyExtractor,
  horizontal,
  getItem,
  collapsable,
  numColumns,
  onChange,
  onChangeText,
  onFocus,
  onBlur,
  placeholder = 'Drop down',
  ...props
}: DropDownProps<T>) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <IconInput
        placeholder={placeholder}
        startAdornment={inputStartAdornment}
        endAdornment={inputEndAdornment}
        onChange={onChange}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        {...iconInputProps}
      />
      <DropDownListContainer
        open={open}
        data={data}
        maxHeight={maxHeight}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal={horizontal}
        getItem={getItem}
        collapsable={collapsable}
        numColumns={numColumns}
        {...listContainerProps}
      />
    </View>
  );
};

const DropDownListContainer = <T,>({
  style,
  open,
  data,
  renderItem,
  keyExtractor,
  horizontal,
  getItem,
  collapsable,
  numColumns,
  maxHeight = 200,
  ...props
}: DropDownListContainerProps<T>) => {
  const height = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const toggleExpand = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: open ? maxHeight : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    toggleExpand();
  }, [open, maxHeight]);

  return (
    <Animated.View
      style={[{ backgroundColor: theme.colors.grey[300] }, styles.listContainer, style, { height, opacity }]}
      {...props}>
      <FlatList
        style={[styles.listContainerScrollView]}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={horizontal}
        getItem={getItem}
        collapsable={collapsable}
        numColumns={numColumns}
        nestedScrollEnabled
      />
    </Animated.View>
  );
};
