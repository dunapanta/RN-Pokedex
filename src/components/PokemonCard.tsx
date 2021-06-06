import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
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
        <FadeInImage uri={pokemon.picture} style={{width: 100, height: 100}} />
        {/* Nombre Pokemon */}
        <View>
          <Text style={styles.namePokemon}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
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
  },
  namePokemon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
});
