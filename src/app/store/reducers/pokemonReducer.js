/**
 * Created by vaibhav on 13/5/18
 */
import {FETCH_POKEMON_FAILURE, FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS} from "../actions/pokemonActions";

const INITIAL_STATE = {
    pokemonList: {
        pokemons: {},
        error: null,
        loading: false
    }
};

export default function pokemonReducer(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_POKEMON_REQUEST:
            return {
                ...state,
                pokemonList: {
                    pokemons: {...state.pokemonList.pokemons},
                    error: null,
                    loading: true
                }
            };
        case FETCH_POKEMON_SUCCESS:
            let pokemon = {...state.pokemonList.pokemons};
            pokemon[action.payload.name] = {...action.payload};
            return {
                ...state,
                pokemonList: {
                    pokemons: {...state.pokemonList.pokemons, ...pokemon},
                    error: null,
                    loading: false
                }
            };
        case FETCH_POKEMON_FAILURE:
            error = action.payload || {message: action.payload.error_description};
            return {
                ...state,
                pokemonList: {
                    pokemons: {},
                    error: error,
                    loading: false
                }
            };
        default:
            return state
    }
}