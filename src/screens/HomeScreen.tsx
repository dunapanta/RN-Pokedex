import React from 'react';
import {ActivityIndicator, FlatList, Image, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {PokemonCard} from '../components/PokemonCard';

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
        numColumns={2}
        //Header
        ListHeaderComponent={() => (
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
            }}>
            Pokedex
          </Text>
        )}
        renderItem={({item, index}) => <PokemonCard pokemon={item} />}
        //Infinite Scroll
        onEndReached={loadedPokemons}
        onEndReachedThreshold={0.4}
        //Cargando
        ListFooterComponent={<ActivityIndicator size={40} color="black" />}
      />
    </>
  );
};
