// store.js
import { createStore,applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
// Define initial state
const initialState = {
  pokelist:[],
  pokemonList: [],
  loading: false,
  error: null,
  nextUrl: null,
  prevUrl: null,
 
};

// Define reducer function
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REFRESH_POKEMON":
      return {
        ...initialState // Reset the state to its initial state
      };
      
    case "FETCH_POKEMON_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_POKEMON_SUCCESS":
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
        nextUrl: action.payload.nextUrl,
        prevUrl: action.payload.prevUrl,
        error: null,
      };
    case "FETCH_POKEMON_DATA":
      return {
        ...state,
        pokelist: [...state.pokelist, action.payload]
      };

    case "FETCH_POKEMON_FAILURE":
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(userReducer,applyMiddleware(thunk));

export default store;
