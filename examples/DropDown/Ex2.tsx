import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Container, DropDown, ThemeProvider } from '../../src';

const DATA = [
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item' },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d12', title: 'Four Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29415', title: 'Five Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29419', title: 'Six Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29412', title: 'Seven Item' },
];

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <ThemeProvider>
            <DropDown
              maxHeight={1000}
              selectedListItem={{ id: '58694a0f-3da1-471f-bd96-145571e29d12', title: 'Four Item' }}
              onItemClicked={(_, item) => console.log(item)}
              inputEndAdornment={
                <Avatar
                  source={{
                    uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  }}
                  size={30}
                  variation="rounded"
                />
              }
              activeItemColor={'red'}
              variation="outlined"
              data={DATA}
              keyExtractor={item => item.id}
            />
          </ThemeProvider>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;