import {PokeAPI} from "../../utils/config";
import {
    POKEMON_LIST_FAILURE,
    POKEMON_LIST_REQUEST,
    POKEMON_LIST_SUCCESS,
    FETCH_POKEMON_FAILURE,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_SPECIES_FAILURE,
    FETCH_SPECIES_REQUEST,
    FETCH_SPECIES_SUCCESS,
} from "../actions";


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

export function fetchPokemonList(limit, offset) {
    return async function (dispatch) {
        dispatch(pokemonListRequest());
        const interval = {
            limit: limit,
            offset: offset
        };

        PokeAPI.getPokemonsList(interval)
            .then(response => {
                response.results.map(async pokemon => {
                    return await PokeAPI.getPokemonByName(pokemon.name).then(response => {
                            dispatch(pokemonListSuccess(response))
                        }
                    ).catch(error =>
                        dispatch(pokemonListFailure(error))
                    );
                })
            })
            .catch(error =>
                dispatch(pokemonListFailure(error))
            );
    }
}
