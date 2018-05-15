/**
 * Created by vaibhav on 14/5/18
 */
import {PokeAPI} from "../../../core/config";


export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';


export function pokemonRequest() {
    return {
        type: FETCH_POKEMON_REQUEST
    }
}

export function pokemonSuccess(data) {
    return {
        type: FETCH_POKEMON_SUCCESS,
        payload: data
    }
}

export function pokemonFailure(error) {
    return {
        type: FETCH_POKEMON_FAILURE,
        payload: error
    }
}

export function fetchPokemon(name) {
    return async function (dispatch) {
        dispatch(pokemonRequest());
        return await PokeAPI.getPokemonByName(name).then(response =>
            dispatch(pokemonSuccess(response))
        ).catch(error =>
            dispatch(pokemonFailure(error))
        );
    }
}