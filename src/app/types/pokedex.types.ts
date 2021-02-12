import { Pokemon } from "./pokemon.types"
import {
  FETCH_POKEDEX_ERROR,
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  SORT_POKEMONS,
} from "../constants"

export interface PokedexState {
  pokemonList: Pokemon[]
  url: string
  error: string | null | undefined
  loading: boolean
}

interface PokedexFetchRequestAction {
  type: typeof FETCH_POKEDEX_REQUEST
}

interface PokedexFetchSuccessAction {
  type: typeof FETCH_POKEDEX_SUCCESS
  payload: {
    data: Pokemon[]
    url: string
  }
}

interface PokedexFetchErrorAction {
  type: typeof FETCH_POKEDEX_ERROR
  payload: string
}

interface PokedexSortAction {
  type: typeof SORT_POKEMONS
  payload: Pokemon[]
}

export type PokedexActionTypes =
  | PokedexFetchRequestAction
  | PokedexFetchSuccessAction
  | PokedexFetchErrorAction
  | PokedexSortAction
