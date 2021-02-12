import {
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
} from "../constants";

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: object[];
  forms: object[];
  game_indices: object[];
  held_items: object[];
  location_area_encounters: string;
  moves: object[];
  sprites: object;
  species: object;
  stats: object[];
  types: object[];
}

export interface PokemonState {
  pokemon: Pokemon | object;
  error: string | null | undefined;
  loading: boolean;
}

interface PokemonFetchRequestAction {
  type: typeof FETCH_POKEMON_REQUEST;
}

interface PokemonFetchSuccessAction {
  type: typeof FETCH_POKEMON_SUCCESS;
  payload: Pokemon;
}

interface PokemonFetchErrorAction {
  type: typeof FETCH_POKEMON_ERROR;
  payload: string;
}

export type PokemonActionTypes =
  | PokemonFetchRequestAction
  | PokemonFetchSuccessAction
  | PokemonFetchErrorAction;
