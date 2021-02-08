import {Reducer} from "redux";
import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS, SORT_POKEMONS} from "../constants";
import {PokedexActionTypes, PokedexState} from "../types/pokedex.types";

const INITIAL_STATE: PokedexState = {
    pokemon_list: [],
    next: `${process.env.REACT_APP_BASE_URL}/pokemon?limit=12&offset=0`,
    error: null,
    loading: false,
}

const pokedexReducer: Reducer = (state = INITIAL_STATE, action: PokedexActionTypes) => {
    switch (action.type) {
        case FETCH_POKEDEX_REQUEST:
            return {
                ...state,
                pokemon_list: [...state.pokemon_list],
                loading: true
            }
        case FETCH_POKEDEX_SUCCESS:
            return {
                ...state,
                pokemon_list: [...state.pokemon_list, ...action.payload.data],
                next: action.payload.next,
                loading: false
            }
        case FETCH_POKEDEX_ERROR:
            return {
                ...state,
                pokemon_list: [...state.pokemon_list],
                error: action.payload,
                loading: false
            }
        case SORT_POKEMONS:
            return {
                ...state,
                pokemon_list: action.payload
            }
        default:
            return state
    }
}

export default pokedexReducer;
