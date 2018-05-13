/**
 * Created by vaibhav on 12/5/18
 */
import axios from 'axios';
import {ROOT_URL} from "../../../core/config";

export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

export function pokemonListRequest() {
    return {
        type: FETCH_POKEMON_REQUEST
    }
}

export function pokemonListSuccess(data) {
    return {
        type: FETCH_POKEMON_SUCCESS,
        payload: data
    }
}

export function pokemonListFailure(error) {
    return {
        type: FETCH_POKEMON_FAILURE,
        payload: error
    }
}


export function fetchPokemon(url) {
    return async function (dispatch) {
        try {
            const response = await axios.get(url);
            const data = await response.data;
            dispatch(pokemonListSuccess(data))
        } catch (e) {
            pokemonListFailure(e);
        }
    }
}

export function fetchPokemonList(limit, offset) {
    return async function (dispatch) {
        dispatch(pokemonListRequest());
        const uri = ROOT_URL + `/pokemon/?limit=${limit}&offset=${offset}`;
        try {
            const response = await axios.get(uri);
            const data = await response.data;
            data.results.forEach((item) => {
                dispatch(fetchPokemon(item.url))
            })
        } catch (e) {
            console.log(e);
        }
    }
}