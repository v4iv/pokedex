/**
 * Created by vaibhav on 14/5/18
 */
import {FETCH_POKEMON_FAILURE, FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS} from "./actions";

const INITIAL_STATE = {
    pokemonObject: {
        pokemon: {},
        error: null,
        loading: false
    }
};

export default function pokemonReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POKEMON_REQUEST:
            return {
                ...state,
                pokemonObject: {
                    pokemons: {},
                    error: null,
                    loading: true
                }
            };
        case FETCH_POKEMON_SUCCESS:
            return {
                ...state,
                pokemonObject: {
                    pokemon: action.payload,
                    error: null,
                    loading: false
                }
            };
        case FETCH_POKEMON_FAILURE:
            return {
                ...state,
                pokemonObject: {
                    pokemon: {},
                    error: action.payload,
                    loading: false
                }
            };
        default:
            return state
    }
}