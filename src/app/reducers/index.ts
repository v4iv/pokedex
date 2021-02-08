import {combineReducers} from 'redux'
import pokedexReducer from "./pokedex.reducer";

const rootReducer = combineReducers({
    pokedex: pokedexReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
