import React, { Suspense, lazy, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import { Box, Spinner } from "gestalt"
import { RootState } from "../../reducers"
import {
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
} from "../../constants"
import { fetchPokemon } from "../../actions/pokemon.action"
import SEO from "../../components/SEO"
// Lazy Load
const PokemonDetails = lazy(() => import("../../components/PokemonDetails"))
const ErrorToast = lazy(() => import("../../components/ErrorToast"))

interface ParamTypes {
  slug: string
}

const PokemonPage: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { slug } = useParams<ParamTypes>()

  const { pokemon, error, loading } = useSelector((state: RootState) => ({
    pokemon: state.pokemon.pokemon,
    error: state.pokemon.error,
    loading: state.pokemon.loading,
  }))

  const handleFetch = useCallback(() => {
    dispatch({
      type: FETCH_POKEMON_REQUEST,
    })

    fetchPokemon(slug)
      .then((res) => {
        dispatch({
          type: FETCH_POKEMON_SUCCESS,
          payload: res,
        })
      })
      .catch((err) => {
        console.error(err)

        dispatch({
          type: FETCH_POKEMON_ERROR,
          payload: "Oops! Something went wrong. Please try again later.",
        })
      })
  }, [dispatch, slug])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return (
    <>
      <SEO
        title="POKéMON"
        description="Pokédex is a mini-encyclopedia of Pokémon species, types etc."
        image="https://react-pokedex.netlify.app/logo192.png"
        url="https://react-pokedex.netlify.app/"
      />

      <Box paddingY={3} height="100%">
        {error && !loading && (
          <Suspense
            fallback={
              <Box paddingY={6}>
                <Spinner accessibilityLabel="Loading..." show />
              </Box>
            }
          >
            <ErrorToast message={error} />
          </Suspense>
        )}

        {!isEmpty(pokemon) && (
          <Suspense
            fallback={
              <Box paddingY={6}>
                <Spinner accessibilityLabel="Loading..." show />
              </Box>
            }
          >
            <PokemonDetails pokemon={pokemon} />
          </Suspense>
        )}

        <Box paddingY={6}>
          <Spinner accessibilityLabel="Loading..." show={loading} />
        </Box>
      </Box>
    </>
  )
}

export default PokemonPage
