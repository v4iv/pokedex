import { Reducer } from "redux";
import { PokemonActionTypes, PokemonState } from "../types/pokemon.types";
import {
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
} from "../constants";

const INITIAL_STATE: PokemonState = {
  pokemon: {},
  error: null,
  loading: false,
};

const pokemonReducer: Reducer = (
  state = INITIAL_STATE,
  action: PokemonActionTypes
) => {
  switch (action.type) {
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        pokemon: {},
        loading: true,
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        pokemon: action.payload,
        loading: false,
      };
    case FETCH_POKEMON_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default pokemonReducer;
