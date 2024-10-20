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
import { ListItem, ListItemText } from '../List';
import { Portal, PortalProvider } from '../Portal';
import { IconInput, TextField } from '../TextField';
import { ListItemTextProps, TextFiledVariation } from '../types';
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
  onItemClicked?: (event: GestureResponderEvent, item: DropDownData) => void;

  /**
   * The currently selected dropdown item, if any.
   * */
  selectedListItem?: DropDownData | null;

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
}

/**
 * Props for the dropdown component itself.
 * Extends from `View` and omits some props from `DropDownListContainerProps`.
 */
export interface DropDownProps<T extends DropDownData>
  extends React.ComponentPropsWithRef<typeof View>,
    Omit<DropDownListContainerProps<T>, 'open' | 'inputLayoutRectangle' | 'dropDownContainerRect'> {
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
  selectedListItem,
  listItemEndAdornment,
  activeItemColor,
  listItemTextProps,
  listItemStartAdornment,
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
  const [selectedItem, setSelectedItem] = useState<DropDownData | null>(null);
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

  const onItemClickedHandler = (event: GestureResponderEvent, item: DropDownData) => {
    if (!!onItemClicked && typeof onItemClicked === 'function') {
      onItemClicked(event, item);
    }
    setSelectedItem(item);
  };

  const renderInput = useCallback(() => {
    const commonProps = {
      placeholder,
      startAdornment: inputStartAdornment,
      endAdornment: inputEndAdornment,
      ignoreOpacityOnNonEditable: true,
      editable: false,
    };

    switch (variation) {
      case 'filled':
        return (
          <TextField
            onLayout={inputOnLayout}
            pointerEvents="none"
            variant="filled"
            value={selectedItem?.title}
            {...commonProps}
          />
        );
      case 'outlined':
        return (
          <TextField
            onLayout={inputOnLayout}
            pointerEvents="none"
            variant="outlined"
            value={selectedItem?.title}
            {...commonProps}
          />
        );
      case 'icon':
        return <IconInput onLayout={inputOnLayout} pointerEvents="none" value={selectedItem?.title} {...commonProps} />;
      default:
        return null;
    }
  }, [variation, placeholder, inputStartAdornment, inputEndAdornment, selectedItem]);

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
          onItemClicked={onItemClickedHandler}
          selectedListItem={selectedListItem || selectedItem}
          showSelectedItem={showSelectedItem}
          activeItemColor={activeItemColor}
          listItemTextProps={listItemTextProps}
          listItemMinHeight={listItemMinHeight}
          listItemEndAdornment={listItemEndAdornment}
          displaySelectedAdornment={displaySelectedAdornment}
          disableTextPadding={disableTextPadding}
          listItemStartAdornment={listItemStartAdornment}
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
  selectedListItem,
  showSelectedItem,
  listItemEndAdornment,
  activeItemColor,
  listItemTextProps,
  listItemMinHeight,
  displaySelectedAdornment,
  disableTextPadding,
  listItemStartAdornment,
  maxHeight = 200,
  ...props
}: DropDownListContainerProps<T>) => {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useTheme();
  const colorScheme = useColorScheme();

  const itemOnPressHandler = (event: GestureResponderEvent, item: DropDownData) => {
    if (!!onClose && typeof onClose === 'function') {
      onClose();
    }
    if (!!onItemClicked && typeof onItemClicked === 'function') {
      onItemClicked(event, item);
    }
  };

  const renderListItem = useCallback(
    ({ item }: { item: DropDownData }) => {
      const isSelected = showSelectedItem && selectedListItem?.id === item.id;

      return (
        <ListItem
          startAdornment={displaySelectedAdornment ? (isSelected ? listItemStartAdornment : null) : listItemStartAdornment}
          selectedColor={activeItemColor || theme.colors.secondary[500]}
          selected={isSelected}
          onPress={event => itemOnPressHandler(event, item)}
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
      selectedListItem,
      showSelectedItem,
      listItemEndAdornment,
      theme,
      listItemTextProps,
      listItemMinHeight,
      displaySelectedAdornment,
      activeItemColor,
      disableTextPadding,
      listItemStartAdornment,
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
    if (selectedListItem && data?.length && open) {
      const index = (data as unknown as Array<DropDownData>).findIndex(item => item.id === selectedListItem.id);
      scrollToItem(index);
    }
  }, [selectedListItem, data, open]);

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
          <FlatList
            ref={flatListRef}
            style={[styles.listContainerScrollView]}
            data={data}
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
