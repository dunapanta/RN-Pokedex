import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {PokemonCard} from '../components/PokemonCard';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends DrawerScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadedPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokebolaBG}
      />
      {/* Toggle Button */}
      {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu-outline" size={30} color="black" />
      </TouchableOpacity> */}
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //Header
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 15,
              }}>
              <Text
                style={{
                  ...globalStyles.title,
                  ...globalStyles.globalMargin,
                }}>
                Pokedex
              </Text>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu-outline" size={40} color="black" />
              </TouchableOpacity>
            </View>
          )}
          renderItem={({item, index}) => <PokemonCard pokemon={item} />}
          //Infinite Scroll
          onEndReached={loadedPokemons}
          onEndReachedThreshold={0.4}
          //Cargando
          ListFooterComponent={<ActivityIndicator size={40} color="black" />}
        />
      </View>
    </>
  );
};
