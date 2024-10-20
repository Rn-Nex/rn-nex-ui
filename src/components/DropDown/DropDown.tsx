import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  ColorValue,
  findNodeHandle,
  FlatList,
  FlatListProps,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  useColorScheme,
  View,
  ViewProps,
} from 'react-native';
import { useTheme } from '../../libraries';
import { MeasureElementRect } from '../../types';
import { Box } from '../Box';
import { ListItem, ListItemText } from '../List';
import { Portal, PortalProvider } from '../Portal';
import { IconInput, IconInputProps, TextField } from '../TextField';
import { BoxProps, ListItemTextProps, TextFiledVariation } from '../types';
import { styles } from './DropDown.styles';

/**
 * Defines the structure of data to be displayed in the dropdown.
 */
export interface DropDownData {
  /**
   * Unique identifier for the dropdown item.
   * */
  id: string;

  /**
   * The display title for the dropdown item.
   * */
  title: string;
}

/**
 * Props for the container that renders the list of dropdown items.
 * Extends properties from `ViewProps` and specific `FlatListProps`.
 */
export interface DropDownListContainerProps<T extends DropDownData> extends ViewProps, Pick<FlatListProps<T>, 'data'> {
  /**
   * Whether the dropdown is open.
   * */
  open?: boolean;

  /**
   * Maximum height of the dropdown container when open.
   * */
  maxHeight?: number;

  /**
   * Callback triggered when the dropdown closes.
   * */
  onClose?: () => void;

  /**
   * Layout rectangle for the input element.
   * */
  inputLayoutRectangle: LayoutRectangle;

  /**
   * The measured dimensions of the dropdown container element.
   * */
  dropDownContainerRect: MeasureElementRect;

  /**
   * Callback triggered when an item is clicked.
   * */
  onItemClicked?: (item: DropDownData) => void;

  /**
   * The currently selected dropdown item, if any.
   * */
  selectedListItems?: Array<DropDownData> | null;

  /**
   * Whether to show the selected item in the dropdown list.
   * */
  showSelectedItem?: boolean;

  /**
   * React node to be displayed at the end of each list item.
   * */
  listItemEndAdornment?: React.ReactNode;

  /**
   * React node to be displayed at the start of each list item.
   * */
  listItemStartAdornment?: React.ReactNode;

  /**
   * Color to apply to the active/selected dropdown item.
   * */
  activeItemColor?: ColorValue;

  /**
   * Props for styling the text inside list items.
   * */
  listItemTextProps?: Pick<ListItemTextProps, 'disablePadding' | 'alignItems'>;

  /**
   * Minimum height for each list item in the dropdown.
   * */
  listItemMinHeight?: number;

  /**
   * Whether to display an adornment for the selected item.
   * */
  displaySelectedAdornment?: boolean;

  /**
   * Remove padding from the list item text component.
   */
  disableTextPadding?: boolean;

  /**
   * Allow to select the multiple list items
   */
  multiselect?: boolean;

  /**
   * Optional boolean prop to enable or disable the search functionality
   */
  search?: boolean;

  /**
   * This will appear inside the search input field when it is empty.
   */
  searchPlaceholder?: string;

  /**
   * You can use this to customize the input, such as handling events, styles, or icons.
   */
  searchProps?: IconInputProps;

  /**
   * The 'children' prop is omitted to prevent accidental overrides of the search input itself.
   */
  searchContainerProps?: Omit<BoxProps, 'children'>;
}

/**
 * Props for the dropdown component itself.
 * Extends from `View` and omits some props from `DropDownListContainerProps`.
 */
export interface DropDownProps<T extends DropDownData>
  extends React.ComponentPropsWithRef<typeof View>,
    Omit<DropDownListContainerProps<T>, 'open' | 'inputLayoutRectangle' | 'dropDownContainerRect' | 'onItemClicked'> {
  /**
   * React node to be displayed at the start of the input field (e.g., an icon).
   * */
  inputStartAdornment?: React.ReactNode;

  /**
   * React node to be displayed at the end of the input field (e.g., an icon).
   * */
  inputEndAdornment?: React.ReactNode;

  /**
   * Placeholder text for the input field when no value is selected.
   * */
  placeholder?: string;

  /**
   * Props for customizing the dropdown list container.
   * */
  listContainerProps?: Omit<DropDownListContainerProps<T>, 'open' | 'onClose' | 'inputLayoutRectangle' | 'dropDownContainerRect'>;

  /**
   * Variation type for the input field, allows different styles or icons.
   * */
  variation?: TextFiledVariation | 'icon';

  /**
   * Callback triggered when the dropdown input field is clicked.
   * */
  onDropDownClicked?: (event: GestureResponderEvent) => void;

  /**
   * Callback triggered when a list item in the dropdown is clicked.
   * */
  onListItemClicked?: (event: GestureResponderEvent, item: DropDownData) => void;

  multiselectMessage?: string;

  /**
   * Callback triggered when an item is clicked.
   * */
  onItemClicked?: (item: Array<DropDownData>) => void;
}

export const DropDown = <T extends DropDownData>({
  inputEndAdornment,
  inputStartAdornment,
  listContainerProps,
  style,
  maxHeight,
  data,
  collapsable,
  onDropDownClicked,
  onItemClicked,
  selectedListItems,
  listItemEndAdornment,
  activeItemColor,
  listItemTextProps,
  listItemStartAdornment,
  multiselectMessage,
  search = false,
  searchPlaceholder,
  searchProps,
  searchContainerProps,
  multiselect = false,
  disableTextPadding = false,
  displaySelectedAdornment = false,
  listItemMinHeight = 40,
  showSelectedItem = true,
  variation = 'outlined',
  placeholder = 'Drop down',
  ...props
}: DropDownProps<T>) => {
  const containerRef = useRef<View>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Array<DropDownData>>([]);
  const [inputRect, setInputRect] = useState<LayoutRectangle | null>(null);
  const [dropDownContainerRect, setDropDownContainerRect] = useState<MeasureElementRect | null>(null);

  const dropDownCloseHandler = () => {
    setOpen(false);
  };

  const dropDownClickHandler = (event: GestureResponderEvent) => {
    if (!!onDropDownClicked && typeof onDropDownClicked === 'function') {
      onDropDownClicked(event);
    }
    if (containerRef?.current) {
      const handle = findNodeHandle(containerRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          setDropDownContainerRect({
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          });
        });
      }
    }
    setOpen(!open);
  };

  const inputOnLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent;
    setInputRect(layout);
  };

  const onItemClickedHandler = (item: DropDownData) => {
    if (multiselect) {
      setSelectedItems(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
    } else {
      setSelectedItems([item]);
    }
  };

  const renderInput = useCallback(() => {
    const commonProps = {
      placeholder,
      startAdornment: inputStartAdornment,
      endAdornment: inputEndAdornment,
      ignoreOpacityOnNonEditable: true,
      editable: false,
      value: multiselect
        ? `${multiselectMessage || 'Selected items'} ${selectedListItems?.length || selectedItems.length}`
        : selectedItems?.[0]?.title,
    };

    switch (variation) {
      case 'filled':
        return <TextField onLayout={inputOnLayout} pointerEvents="none" variant="filled" {...commonProps} />;
      case 'outlined':
        return <TextField onLayout={inputOnLayout} pointerEvents="none" variant="outlined" {...commonProps} />;
      case 'icon':
        return <IconInput onLayout={inputOnLayout} pointerEvents="none" {...commonProps} />;
      default:
        return null;
    }
  }, [
    variation,
    placeholder,
    inputStartAdornment,
    inputEndAdornment,
    selectedItems,
    multiselectMessage,
    multiselect,
    selectedListItems,
  ]);

  useEffect(() => {
    if (!!onItemClicked && typeof onItemClicked === 'function') {
      onItemClicked(selectedItems);
    }
  }, [selectedItems]);

  return (
    <View collapsable={false} style={[style]} {...props} ref={containerRef}>
      <TouchableOpacity onPress={dropDownClickHandler}>{renderInput()}</TouchableOpacity>
      {inputRect && dropDownContainerRect && (
        <DropDownListContainer
          open={open}
          data={data}
          maxHeight={maxHeight}
          collapsable={collapsable}
          onClose={dropDownCloseHandler}
          inputLayoutRectangle={inputRect}
          dropDownContainerRect={dropDownContainerRect}
          selectedListItems={selectedListItems || selectedItems}
          showSelectedItem={showSelectedItem}
          activeItemColor={activeItemColor}
          listItemTextProps={listItemTextProps}
          listItemMinHeight={listItemMinHeight}
          listItemEndAdornment={listItemEndAdornment}
          displaySelectedAdornment={displaySelectedAdornment}
          disableTextPadding={disableTextPadding}
          listItemStartAdornment={listItemStartAdornment}
          multiselect={multiselect}
          onItemClicked={onItemClickedHandler}
          search={search}
          searchPlaceholder={searchPlaceholder}
          searchProps={searchProps}
          searchContainerProps={searchContainerProps}
          {...listContainerProps}
        />
      )}
    </View>
  );
};

const DropDownListContainer = <T extends DropDownData>({
  style,
  open,
  data,
  collapsable,
  onClose,
  inputLayoutRectangle,
  dropDownContainerRect,
  onItemClicked,
  selectedListItems,
  showSelectedItem,
  listItemEndAdornment,
  activeItemColor,
  listItemTextProps,
  listItemMinHeight,
  displaySelectedAdornment,
  disableTextPadding,
  listItemStartAdornment,
  multiselect,
  search,
  searchPlaceholder,
  searchProps,
  searchContainerProps,
  maxHeight = 200,
  ...props
}: DropDownListContainerProps<T>) => {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();
  const [filteredData, setFilteredData] = useState<DropDownData[] | null>(null);

  const itemOnPressHandler = (item: DropDownData) => {
    if (!multiselect) {
      if (!!onClose && typeof onClose === 'function') {
        onClose();
        setFilteredData(null);
      }
    }
    if (!!onItemClicked && typeof onItemClicked === 'function') {
      onItemClicked(item);
    }
  };

  const searchHandler = (search: string) => {
    if (search) {
      const newData = (data as unknown as Array<DropDownData>).filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredData(newData);
    } else {
      setFilteredData(null);
    }
  };

  const renderListItem = useCallback(
    ({ item }: { item: DropDownData }) => {
      const isSelected = Boolean(
        showSelectedItem && selectedListItems?.length && selectedListItems.some(selectedItem => selectedItem.id === item.id),
      );

      return (
        <ListItem
          startAdornment={displaySelectedAdornment ? (isSelected ? listItemStartAdornment : null) : listItemStartAdornment}
          selectedColor={activeItemColor || theme.colors.secondary[500]}
          selected={isSelected}
          onPress={() => itemOnPressHandler(item)}
          endAdornment={displaySelectedAdornment ? (isSelected ? listItemEndAdornment : null) : listItemEndAdornment}
          style={[{ minHeight: listItemMinHeight }]}>
          <ListItemText
            secondaryLabelProps={{
              sx: {
                color:
                  colorScheme === 'dark' ? theme.colors.grey[900] : isSelected ? theme.colors.grey[50] : theme.colors.grey[900],
              },
            }}
            disablePadding={disableTextPadding}
            secondary={item.title}
            {...listItemTextProps}
          />
        </ListItem>
      );
    },
    [
      selectedListItems,
      showSelectedItem,
      listItemEndAdornment,
      theme,
      listItemTextProps,
      listItemMinHeight,
      displaySelectedAdornment,
      activeItemColor,
      disableTextPadding,
      listItemStartAdornment,
      multiselect,
    ],
  );

  const scrollToItem = (index: number) => {
    setTimeout(() => {
      if (flatListRef?.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }, 200);
  };

  useEffect(() => {
    if (selectedListItems && selectedListItems.length && data?.length && open) {
      const index = (data as unknown as Array<DropDownData>).findIndex(item => item.id === selectedListItems?.[0].id);
      scrollToItem(index);
    }
  }, [selectedListItems, data, open]);

  return (
    <PortalProvider>
      <Portal
        portalKey="drop-down-portal-key"
        animationType="fade"
        visible={open}
        onClose={onClose}
        modalContainerProps={{ style: [styles.dropDownModal] }}>
        <Animated.View
          style={StyleSheet.flatten([
            styles.listContainer,
            style,
            {
              backgroundColor: theme.colors.grey[300],
              maxHeight,
              top: dropDownContainerRect.pageY + inputLayoutRectangle.height,
            },
          ])}
          {...props}>
          {search && (
            <Box sx={{ px: 5, py: 4 }} {...searchContainerProps}>
              <IconInput
                onChangeText={searchHandler}
                inputWrapperProps={{ style: { borderColor: theme.colors.grey[600], borderWidth: 0.7, height: 30 } }}
                placeholder={searchPlaceholder || 'Search'}
                {...searchProps}
              />
            </Box>
          )}
          <FlatList
            ref={flatListRef}
            style={[styles.listContainerScrollView]}
            data={filteredData || data}
            renderItem={renderListItem}
            keyExtractor={item => item.id}
            collapsable={collapsable}
            nestedScrollEnabled
            overScrollMode="always"
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
          />
        </Animated.View>
      </Portal>
    </PortalProvider>
  );
};
