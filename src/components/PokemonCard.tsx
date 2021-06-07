import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

const windowWith = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={{...styles.cardContainer, width: windowWith * 0.44}}>
        {/* Nombre Pokemon */}
        <View>
          <Text style={styles.namePokemon}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokeContainer}>
          <Image
            style={styles.pokebola}
            source={require('../assets/pokebola-blanca.png')}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 20,

    elevation: 5,
    //overflow: 'hidden'
  },
  namePokemon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -15,
    bottom: -15,
  },
  pokemonImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: -6,
    bottom: -5,
  },
  pokeContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.3,
  },
});
