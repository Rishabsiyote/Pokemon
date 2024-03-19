import axios from "axios";

// actions.js

  
  export const fetchPokemonRequest = () => ({
    type: "FETCH_POKEMON_REQUEST",
  });
  export const fetchPokemonData = (pokelist) => ({
    type: "FETCH_POKEMON_DATA",
    payload: { pokelist },
  });
  
  export const refreshPokemon = () => ({
    type: "REFRESH_POKEMON"
  });
  
  export const fetchPokemonSuccess = (pokemonList, nextUrl, prevUrl) => ({
    type: "FETCH_POKEMON_SUCCESS",
    payload: { pokemonList, nextUrl, prevUrl },
  });
  
  export const fetchPokemonFailure = (error) => ({
    type: "FETCH_POKEMON_FAILURE",
    payload: error,
  });

  export const getPokemon = (res) => {
    return async (dispatch) => {
      if (Array.isArray(res)) {
        try {
          const pokemonData = await Promise.all(res.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
          }));
          dispatch(fetchPokemonData(pokemonData));
          // console.log(pokemonData)
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
          // You can dispatch an error action if needed
        }
      }
    };
  }
  export const fetchPokemon = (url = "https://pokeapi.co/api/v2/pokemon/") => {
  return async (dispatch) => {
    dispatch(fetchPokemonRequest());
    try {
      const response = await axios.get(url);
      dispatch(
        fetchPokemonSuccess(
          response.data.results,
          response.data.next,
          response.data.previous
        )
      );
    } catch (error) {
      dispatch(fetchPokemonFailure(error.message));
    }
  };
};