import {combineReducers} from "redux";
import pokemonListReducer from "./pokemonListReducer";
import pokemonReducer from "./pokemonReducer";

const rootReducer = combineReducers({
    pokemonReducer: pokemonReducer,
    pokemonListReducer: pokemonListReducer,
});

export default rootReducer;
