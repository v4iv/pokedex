/**
 * Created by vaibhav on 12/5/18
 */
import {PokeAPI} from "../../../core/config";


export const POKEMON_LIST_REQUEST = 'POKEMON_LIST_REQUEST';
export const POKEMON_LIST_SUCCESS = 'POKEMON_LIST_SUCCESS';
export const POKEMON_LIST_FAILURE = 'POKEMON_LIST_FAILURE';

export function pokemonListRequest() {
    return {
        type: POKEMON_LIST_REQUEST
    }
}

export function pokemonListSuccess(data) {
    return {
        type: POKEMON_LIST_SUCCESS,
        payload: data
    }
}

export function pokemonListFailure(error) {
    return {
        type: POKEMON_LIST_FAILURE,
        payload: error
    }
}

export function fetchPokemonList(limit, offset) {
    return async function (dispatch) {
        dispatch(pokemonListRequest());
        let pokeapi_urls = [];
        for (let p = offset; p <= limit; p++) {
            pokeapi_urls.push(`/api/v2/pokemon/${p}/`);
        }
        return await PokeAPI.resource(pokeapi_urls).then(response =>
            dispatch(pokemonListSuccess(response))
        ).catch(error =>
            dispatch(pokemonListFailure(error))
        );
    }
}