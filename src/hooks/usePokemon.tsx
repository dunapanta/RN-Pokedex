import React, {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFull} from '../interfaces/pokemonInterfaces';

export const usePokemon = (id: string) => {
  const [isloading, setIsloading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull); //para que no de error ej pokemon.moves daria undefined

  const loadPokemon = async () => {
    const pokemonResp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(pokemonResp.data);
    setIsloading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isloading,
    pokemon,
  };
};
