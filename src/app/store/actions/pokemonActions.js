/**
 * Created by vaibhav on 12/5/18
 */
const Pokedex = require('pokeapi-js-wrapper');
const options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 60 * 1000 // 60s
};
const P = new Pokedex.Pokedex(options);


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

export function fetchPokemonList(limit, offset) {
    return async function (dispatch) {
        dispatch(pokemonListRequest());
        let pokeapi_urls = [];
        for (let p = offset; p <= limit; p++) {
            pokeapi_urls.push(`/api/v2/pokemon/${p}`);
        }
        return P.resource(pokeapi_urls).then(response =>
            dispatch(pokemonListSuccess(response))
        ).catch(error =>
            dispatch(pokemonListFailure(error))
        );
    }
}