import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, loadedPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokebolaBG}
      />
      <FlatList
        data={simplePokemonList}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Image
            source={{uri: item.picture}}
            style={{width: 100, height: 100}}
          />
        )}
        //Infinite Scroll
        onEndReached={loadedPokemons}
        onEndReachedThreshold={0.4}
        //Cargando
        ListFooterComponent={<ActivityIndicator size={40} color="black" />}
      />
      {/* <Text
        style={{
          ...globalStyles.title,
          ...globalStyles.globalMargin,
          top: top + 20,
        }}>
        Pokedex
      </Text> */}
    </>
  );
};
