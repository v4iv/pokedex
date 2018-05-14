/**
 * Created by vaibhav on 13/5/18
 */
import {POKEMON_LIST_FAILURE, POKEMON_LIST_REQUEST, POKEMON_LIST_SUCCESS} from "./actions";

const INITIAL_STATE = {
    pokemonList: {
        pokemons: {},
        error: null,
        loading: false
    }
};

export default function pokemonListReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POKEMON_LIST_REQUEST:
            return {
                ...state,
                pokemonList: {
                    pokemons: {...state.pokemonList.pokemons},
                    error: null,
                    loading: true
                }
            };
        case POKEMON_LIST_SUCCESS:
            let pokemons = {...state.pokemonList.pokemons};
            action.payload.forEach((pokemon) => {
                pokemons[pokemon.name] = {...pokemon}
            });
            return {
                ...state,
                pokemonList: {
                    pokemons: {...state.pokemonList.pokemons, ...pokemons},
                    error: null,
                    loading: false
                }
            };
        case POKEMON_LIST_FAILURE:
            return {
                ...state,
                pokemonList: {
                    pokemons: {},
                    error: action.payload,
                    loading: false
                }
            };
        default:
            return state
    }
}