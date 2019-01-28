import {
    FETCH_POKEMON_FAILURE,
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_SPECIES_FAILURE,
    FETCH_SPECIES_REQUEST,
    FETCH_SPECIES_SUCCESS,
    POKEMON_LIST_FAILURE,
    POKEMON_LIST_REQUEST,
    POKEMON_LIST_SUCCESS
} from "../actions";

const INITIAL_STATE = {
    pokemonList: {
        pokemons: [],
        error: null,
        loading: false
    },
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

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case POKEMON_LIST_REQUEST:
            return {
                ...state,
                pokemonList: {
                    pokemons: [...state.pokemonList.pokemons],
                    error: null,
                    loading: true
                }
            };
        case POKEMON_LIST_SUCCESS:
            return {
                ...state,
                pokemonList: {
                    pokemons: [...state.pokemonList.pokemons, action.payload],
                    error: null,
                    loading: false
                }
            };
        case POKEMON_LIST_FAILURE:
            return {
                ...state,
                pokemonList: {
                    pokemons: [],
                    error: action.payload,
                    loading: false
                }
            };
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
