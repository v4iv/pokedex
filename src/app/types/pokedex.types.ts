import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS, SORT_POKEMONS} from "../constants";


export interface Pokemon {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: object[],
    forms: object[],
    game_indices: object[],
    held_items: object[],
    location_area_encounters: string
    moves: object[],
    sprites: object,
    species: object,
    stats: object[],
    types: object[]
}

export interface PokedexState {
    pokemon_list: Pokemon[]
    next: string
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
        next: string
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

export type PokedexActionTypes = PokedexFetchRequestAction | PokedexFetchSuccessAction | PokedexFetchErrorAction | PokedexSortAction
