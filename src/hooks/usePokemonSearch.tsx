import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonPaginationResponse,
  SimplePokemon,
  Result,
} from '../interfaces/pokemonInterfaces';

const pokemonFiltered = [
  10080, 10081, 10082, 10083, 10084, 10085, 10094, 10095, 10096, 10097, 10098,
  10099, 10116, 10117, 10121, 10130, 10131, 10132, 10133, 10134, 10135, 10137,
  10138, 10139, 10140, 10141, 10142, 10143, 10145, 10147, 10148, 10175, 10179,
  10217,
];

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

    const pokeFilter = newPokemonList.filter(poke => {
      const InvalidPokemon = pokemonFiltered.find(
        pokeInvalid => pokeInvalid === Number(poke.id),
      );
      //Si retorna false se elimina el pokemon del arreglo
      if (InvalidPokemon) {
        return false;
      }
      return true;
    });

    setSimplePokemonList(pokeFilter);
  };

  useEffect(() => {
    loadedPokemons();
  }, []);

  return {simplePokemonList, isFetching};
};
