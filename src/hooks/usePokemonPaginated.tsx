import {useEffect, useRef} from 'react';
import {pokemonApi} from '../api/pokemonApi';

export const usePokemonPaginated = () => {
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadedPokemons = async () => {
    const resp = await pokemonApi.get(nextPageUrl.current);
    console.log(resp.data);
  };

  useEffect(() => {
    loadedPokemons();
  }, []);

  return {};
};
