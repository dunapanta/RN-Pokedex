import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {globalStyles} from '../theme/appTheme';

interface Props extends DrawerScreenProps<any, any> {}

//const screenWidth = Dimensions.get('window').width;

export const SearchScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [pokemonFiltred, setPokemonFiltred] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltred([]);
    }

    setPokemonFiltred(
      simplePokemonList.filter(pokemon =>
        pokemon.name.toLocaleLowerCase().includes(term.toLowerCase()),
      ),
    );
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, marginTop: 5}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          top: top + 10,
          marginBottom: top + 20,
          paddingBottom: 15,
        }}>
        <Text
          style={{
            ...globalStyles.title,
            ...globalStyles.globalMargin,
          }}>
          Buscar
        </Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <SearchInput onDebounce={value => setTerm(value)} />

      <FlatList
        data={pokemonFiltred}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        //Header

        renderItem={({item, index}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
