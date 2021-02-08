import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS} from "../constants";


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

interface PokedexRequestAction {
    type: typeof FETCH_POKEDEX_REQUEST
}

interface PokedexSuccessAction {
    type: typeof FETCH_POKEDEX_SUCCESS
    payload: {
        data: Pokemon[]
        next: string
    }
}

interface PokedexErrorAction {
    type: typeof FETCH_POKEDEX_ERROR
    payload: string
}

export type PokedexActionTypes = PokedexRequestAction | PokedexSuccessAction | PokedexErrorAction
