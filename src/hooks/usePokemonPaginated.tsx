import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginationResponse,
  SimplePokemon,
  Result,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadedPokemons = async () => {
    setIsLoading(true);

    const resp = await pokemonApi.get<PokemonPaginationResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;

    mapPokemonList(resp.data.results);

    setIsLoading(false);
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
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
  };

  useEffect(() => {
    loadedPokemons();
  }, []);

  return {simplePokemonList, isLoading, loadedPokemons};
};
