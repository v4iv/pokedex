import { combineReducers } from "redux";
import pokedexReducer from "./pokedex.reducer";
import pokemonReducer from "./pokemon.reducer";

const rootReducer = combineReducers({
  pokedex: pokedexReducer,
  pokemon: pokemonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
