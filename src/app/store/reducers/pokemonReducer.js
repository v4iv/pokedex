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
            let pokemons = {...state.pokemonList.pokemons};
            action.payload.forEach((pokemon)=>{
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
        case FETCH_POKEMON_FAILURE:
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