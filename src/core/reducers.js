/**
 * Created by vaibhav on 16/4/18
 */
import {combineReducers} from "redux";
import pokemonListReducer from "../app/containers/PokemonListContainer/reducer";
import pokemonReducer from "../app/containers/PokemonContainer/reducer";

const rootReducer = combineReducers({
    pokemonListReducer: pokemonListReducer,
    pokemonReducer: pokemonReducer,
});

export default rootReducer;