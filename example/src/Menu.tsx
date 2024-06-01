import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, UIManager, View, findNodeHandle } from 'react-native';
import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, PortalProvider, Text } from '../../src';
import { MeasureElementRect } from '../../src/types';

export const App: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null);
  const [r, setR] = useState<MeasureElementRect | null>(null);

  const handlePress = () => {
    setShowMenu(true);
    if (buttonRef.current) {
      const handle = findNodeHandle(buttonRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          setR({
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
  };

  return (
    <PortalProvider>
      <ScrollView style={{ flex: 1, paddingVertical: 30 }}>
        <View style={{ height: 1000 }}></View>
        <View style={styles.container}>
          <Button ref={buttonRef} fullWidth onPress={handlePress}>
            <Text>Click to show menu</Text>
          </Button>
          <Menu
            rootElementRect={r}
            visible={showMenu}
            portalKey="menu_item_key"
            animationType="fade"
            onClose={() => setShowMenu(false)}>
            <MenuList>
              <MenuItem onPress={() => console.log('done')}>
                <ListItemIcon>
                  <Avatar
                    source={{
                      uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
                    }}
                    size={30}
                    variation="rounded"
                  />
                </ListItemIcon>
                <ListItemText secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
              </MenuItem>
              <MenuItem onPress={() => console.log('done')}>
                <ListItemIcon>
                  <Avatar
                    source={{
                      uri: 'https://imgs.search.brave.com/WHJCQXFEWeTCsmPBN1X3quXyqvqubCn9Zk586lY-Mv8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRY/TmxjaVV5TUhCeWIy/WnBiR1Y4Wlc1OE1I/eDhNSHg4ZkRBPQ',
                    }}
                    size={30}
                    variation="rounded"
                  />
                </ListItemIcon>
                <ListItemText secondary="Ali Connors — I'll be in your neighborhood doing errands this…" />
              </MenuItem>
            </MenuList>
          </Menu>
        </View>
        <View style={{ height: 1000 }}></View>
      </ScrollView>
    </PortalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
