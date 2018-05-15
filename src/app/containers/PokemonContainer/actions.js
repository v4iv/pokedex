/**
 * Created by vaibhav on 14/5/18
 */
import {PokeAPI} from "../../../core/config";


export const FETCH_POKEMON_REQUEST = 'FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

export const FETCH_SPECIES_REQUEST = 'FETCH_SPECIES_REQUEST';
export const FETCH_SPECIES_SUCCESS = 'FETCH_SPECIES_SUCCESS';
export const FETCH_SPECIES_FAILURE = 'FETCH_SPECIES_FAILURE';


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

export function specieRequest() {
    return {
        type: FETCH_SPECIES_REQUEST,
    }
}

export function specieSuccess(data) {
    return {
        type: FETCH_SPECIES_SUCCESS,
        payload: data
    }
}

export function specieFailure(error) {
    return {
        type: FETCH_SPECIES_FAILURE,
        payload: error
    }
}


export function fetchSpecies(name) {
    return async function (dispatch) {
        dispatch(specieRequest());
        return await PokeAPI.getPokemonSpeciesByName(name).then(response =>
            dispatch(specieSuccess(response))
        ).catch(error =>
            dispatch(specieFailure(error))
        );
    }
}

export function fetchPokemon(name) {
    return async function (dispatch) {
        dispatch(pokemonRequest());
        return await PokeAPI.getPokemonByName(name).then(response => {
                dispatch(pokemonSuccess(response));
                dispatch(fetchSpecies(name));
            }
        ).catch(error =>
            dispatch(pokemonFailure(error))
        );
    }
}