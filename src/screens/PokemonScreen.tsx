import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {FadeInImage} from '../components/FadeInImage';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {RootStackParms} from '../navigation/Navigator';
import {globalStyles} from '../theme/appTheme';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParms, 'PokemonScreen'> {
  simplePokemon: SimplePokemon;
  color: string;
}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {top} = useSafeAreaInsets();

  const {isloading, pokemon: pokemonFull} = usePokemon(simplePokemon.id);
  console.log(pokemonFull);
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View
        style={{
          ...styles.headrContainer,
          backgroundColor: color,
        }}>
        {/* Back Button */}
        <View style={{...styles.backButton, top: top + 10}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.pop()}>
            <Icon
              name="arrow-back-outline"
              color="white"
              size={40}
              style={styles.backArrow}
            />
          </TouchableOpacity>
        </View>
        {/* Nombre Pokemon */}
        <Text style={{...styles.pokemonName, top: top + 65}}>
          {simplePokemon.name + '\n'} #{simplePokemon.id}
        </Text>
        {/* Imagen Pokebola */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeballImage}
        />
        <FadeInImage uri={simplePokemon.picture} style={styles.pokemonImage} />
      </View>

      {/* Detalles */}
      {isloading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={simplePokemon.color || 'black'} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonFull} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headrContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    //justifyContent: 'center',
    borderBottomRightRadius: 700,
    borderBottomLeftRadius: 700,
  },
  backButton: {
    position: 'absolute',
    zIndex: 7,
    //elevation: 10,
    height: 60,
    width: 60,
    backgroundColor: 'rgb(187,187,187)',
    shadowOpacity: 0.8,
    opacity: 0.7,
    borderRadius: 50,
    left: 12,
  },
  backArrow: {
    position: 'relative',
    zIndex: 2,
    elevation: 3,
    top: 10,
    left: 10,
  },
  pokemonName: {
    color: 'white',
    fontSize: 35,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeballImage: {
    height: 250,
    width: 250,
    bottom: -20,
    opacity: 0.6,
  },
  pokemonImage: {
    position: 'absolute',
    bottom: -15,
    width: 270,
    height: 270,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
