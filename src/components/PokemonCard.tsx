import {useNavigation} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

const windowWith = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [pokemonColor, setPokemonColor] = useState('rgb(187,187,187)');
  const {navigate} = useNavigation();
  const isMounted = useRef(true);

  const extractColor = async () => {
    const colors = await ImageColors.getColors(pokemon.picture, {
      fallback: 'rgb(187,187,187)',
    });
    //Si esta desmontado no se tiene que ejecutar lo de los colores porque da un warning de perdida de memoria
    if (!isMounted) return;

    if (colors.platform === 'android') {
      setPokemonColor(colors.dominant || 'rgb(187,187,187)');
    } else {
      setPokemonColor(colors.background || 'rgb(187,187,187)');
    }
  };

  useEffect(() => {
    extractColor();

    return () => {
      isMounted.current = false;
    };
  }, [pokemon]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: pokemonColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWith * 0.44,
          backgroundColor: pokemonColor,
        }}>
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
