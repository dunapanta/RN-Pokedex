import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {Navigator} from './src/navigation/Navigator';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};
export default App;
