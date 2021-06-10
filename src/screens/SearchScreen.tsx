import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {globalStyles} from '../theme/appTheme';

interface Props extends DrawerScreenProps<any, any> {}

export const SearchScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  if (isFetching) {
    return (
      <View style={styles.loadingStyle}>
        <ActivityIndicator size={50} color="grey" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginTop: top + 5}}>
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

      <SearchInput />

      <FlatList
        data={simplePokemonList}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        //Header

        renderItem={({item, index}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
