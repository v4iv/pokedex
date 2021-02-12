import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { RootState } from "../../reducers";
import {
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
} from "../../constants";
import { fetchPokemon } from "../../actions/pokemon.action";
import SEO from "../../components/SEO";
import Spinner from "../../components/Spinner";
import PokemonLayout from "../../components/PokemonLayout";

interface ParamTypes {
  slug: string;
}

const PokemonPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { slug } = useParams<ParamTypes>();

  const { pokemon, error, loading } = useSelector((state: RootState) => ({
    pokemon: state.pokemon.pokemon,
    error: state.pokemon.error,
    loading: state.pokemon.loading,
  }));

  const handleFetch = useCallback(() => {
    dispatch({
      type: FETCH_POKEMON_REQUEST,
    });

    fetchPokemon(slug)
      .then((res) => {
        dispatch({
          type: FETCH_POKEMON_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        console.error(err);

        dispatch({
          type: FETCH_POKEMON_ERROR,
          payload: "An Error Occurred! Please Try Again.",
        });
      });
  }, [dispatch, slug]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <>
      <SEO
        title="POKéMON"
        description="Pokédex is a mini-encyclopedia of Pokémon species, types etc."
        image="https://pokedex.theleakycauldronblog.com/logo192.png"
        url="https://pokedex.theleakycauldronblog.com"
      />

      <section className="section">
        {!error && !isEmpty(pokemon) && <PokemonLayout pokemon={pokemon} />}

        {loading && <Spinner />}
      </section>
    </>
  );
};

export default PokemonPage;
