import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import DrawerNavigator from './src/navigation/Drawer';
import {Navigator} from './src/navigation/Navigator';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
export default App;
