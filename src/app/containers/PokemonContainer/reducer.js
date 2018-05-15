/**
 * Created by vaibhav on 14/5/18
 */
import {
    FETCH_POKEMON_FAILURE,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_SPECIES_FAILURE, FETCH_SPECIES_REQUEST,
    FETCH_SPECIES_SUCCESS
} from "./actions";

const INITIAL_STATE = {
    pokemonObject: {
        pokemon: {
            forms: [],
            abilities: [],
            stats: [],
            moves: [],
            sprites: {},
            held_items: [],
            species: {},
            game_indices: [],
            types: []
        },
        error: null,
        loading: false
    },
    specieObject: {
        specie: {
            flavor_text_entries: [{}],
            genera: [{}]
        },
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
                    pokemon: {
                        forms: [],
                        abilities: [],
                        stats: [],
                        moves: [],
                        sprites: {},
                        held_items: [],
                        species: {},
                        game_indices: [],
                        types: []
                    },
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
                    pokemon: {
                        forms: [],
                        abilities: [],
                        stats: [],
                        moves: [],
                        sprites: {},
                        held_items: [],
                        species: {},
                        game_indices: [],
                        types: []
                    },
                    error: action.payload,
                    loading: false
                }
            };
        case FETCH_SPECIES_REQUEST:
            return {
                ...state,
                specieObject: {
                    specie: {
                        flavor_text_entries: [{}],
                        genera: [{}]
                    },
                    error: null,
                    loading: true
                }
            };
        case FETCH_SPECIES_SUCCESS:
            return {
                ...state,
                specieObject: {
                    specie: {...action.payload},
                    error: null,
                    loading: false
                }
            };
        case FETCH_SPECIES_FAILURE:
            return {
                ...state,
                specieObject: {
                    specie: {
                        flavor_text_entries: [{}],
                        genera: [{}]
                    },
                    error: action.payload,
                    loading: false
                }
            };
        default:
            return state
    }
}