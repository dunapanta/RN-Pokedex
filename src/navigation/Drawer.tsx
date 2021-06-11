import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {Navigator, RootStackParms} from './Navigator';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonScreen} from '../screens/PokemonScreen';
const Drawer = createDrawerNavigator();

const Search = createStackNavigator<RootStackParms>();

export const SearchNavigator = () => {
  return (
    <Search.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Search.Screen name="HomeScreen" component={SearchScreen} />
      <Search.Screen name="PokemonScreen" component={PokemonScreen} />
    </Search.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      drawerPosition="right">
      <Drawer.Screen name="Home" component={Navigator} />
      <Drawer.Screen name="SearchScreen" component={SearchNavigator} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => {
  return (
    <DrawerContentScrollView style={{backgroundColor: 'rgb(181,181,181)'}}>
      <View style={{marginLeft: 40, marginTop: 20}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.menuButton}>
          <Icon name="home-outline" style={{paddingRight: 20}} size={30} />
          <Text style={styles.text}>Pokedex</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.menuButton}>
          <Icon name="search-outline" style={{paddingRight: 20}} size={30} />
          <Text style={styles.text}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default DrawerNavigator;
