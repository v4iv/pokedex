/**
 * Created by vaibhav on 16/4/18
 */
import {combineReducers} from "redux";
import pokemonReducer from "./pokemonReducer";

const rootReducer = combineReducers({
    pokemonReducer: pokemonReducer,
});

export default rootReducer;