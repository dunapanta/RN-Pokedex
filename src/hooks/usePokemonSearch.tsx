import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginationResponse,
  SimplePokemon,
  Result,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadedPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginationResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );

    mapPokemonList(resp.data.results);

    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        name,
        id,
        picture,
      };
    });
    setSimplePokemonList(newPokemonList);
  };

  useEffect(() => {
    loadedPokemons();
  }, []);

  return {simplePokemonList, isFetching};
};
