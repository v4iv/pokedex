import React, { lazy, Suspense, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { isEmpty, random } from "lodash"
import {
  Box,
  Button,
  Divider,
  SelectList,
  SelectListProps,
  Spinner,
} from "gestalt"
import { RootState } from "../../reducers"
import {
  FETCH_POKEDEX_ERROR,
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  SORT_POKEMONS,
} from "../../constants"
import { fetchPokemons, sortPokemons } from "../../actions/pokedex.action"
import SEO from "../../components/SEO"
// Lazy Load
const PokemonGrid = lazy(() => import("../../components/PokemonGrid"))
const ErrorToast = lazy(() => import("../../components/ErrorToast"))

const HomePage: React.FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [surprise, setSurprise] = useState(false)
  const [order, setOrder] = useState("lowest_number_first")

  const { pokemonList, url, error, loading } = useSelector(
    (state: RootState) => ({
      pokemonList: state.pokedex.pokemonList,
      url: state.pokedex.url,
      error: state.pokedex.error,
      loading: state.pokedex.loading,
    })
  )

  const handleFetch = useCallback(() => {
    dispatch({
      type: FETCH_POKEDEX_REQUEST,
    })

    fetchPokemons(url)
      .then((res) => {
        dispatch({
          type: FETCH_POKEDEX_SUCCESS,
          payload: res,
        })
      })
      .catch((err) => {
        console.error(FETCH_POKEDEX_ERROR, err)
        dispatch({
          type: FETCH_POKEDEX_ERROR,
          payload: "Oops! Something went wrong. Please try again later.",
        })
      })
  }, [dispatch, url])

  const sortOptions = [
    {
      value: "lowest_number_first",
      label: "Lowest Number (First)",
    },
    {
      value: "highest_number_first",
      label: "Highest Number (First)",
    },
    {
      value: "z_a",
      label: "A - Z",
    },
    {
      value: "a_z",
      label: "Z - A",
    },
  ]

  const handleSort: SelectListProps["onChange"] = ({ value }) => {
    setOrder(value)

    const payload = sortPokemons(pokemonList, value)

    dispatch({
      type: SORT_POKEMONS,
      payload,
    })
  }

  const handleSurprise = () => {
    setSurprise(true)

    const wait: number = random(1000, 3000)

    setTimeout(() => {
      const randomNumber = random(1, 898)

      const slug = `/pokemon/${randomNumber}/`

      history.push(slug)
    }, wait)
  }

  useEffect(() => {
    if (isEmpty(pokemonList)) {
      handleFetch()
    }
  }, [handleFetch]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SEO
        title="Home"
        description="Pokédex is a mini-encyclopedia of Pokémon species, types etc."
        image="https://react-pokedex.netlify.app/logo192.png"
        url="https://react-pokedex.netlify.app/"
      />

      <Box paddingY={1}>
        <Box
          marginBottom={2}
          display="flex"
          justifyContent="between"
          alignItems="center"
        >
          <Box margin={1} column={6}>
            {surprise ? (
              <Spinner
                accessibilityLabel="Loading Surprise..."
                show={surprise}
              />
            ) : (
              <Button
                name="Surprise"
                color="blue"
                onClick={handleSurprise}
                text="Surprise Me!"
                disabled={surprise}
              />
            )}
          </Box>
          <Box margin={1} column={6}>
            <SelectList
              id="sort"
              name="Sort"
              onChange={handleSort}
              options={sortOptions}
              placeholder="Sort By"
              value={order}
            />
          </Box>
        </Box>

        <Divider />

        {!isEmpty(pokemonList) && (
          <Suspense
            fallback={
              <Box paddingY={6}>
                <Spinner accessibilityLabel="Loading..." show />
              </Box>
            }
          >
            <PokemonGrid
              pokemons={pokemonList}
              loadItems={handleFetch}
              loading={loading}
            />
          </Suspense>
        )}

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
      </Box>
    </>
  )
}

export default HomePage
