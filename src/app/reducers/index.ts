import { combineReducers } from "redux"
import pokedexReducer from "./pokedex.reducer"
import pokemonReducer from "./pokemon.reducer"
import searchReducer from "./search.reducer"

const rootReducer = combineReducers({
  pokedex: pokedexReducer,
  pokemon: pokemonReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
