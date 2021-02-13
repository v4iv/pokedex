import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { isEmpty, random } from "lodash"
import {
  Box,
  Button,
  Divider,
  Heading,
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
import ErrorBox from "../../components/ErrorBox"
import PokemonGrid from "../../components/PokemonGrid"

const HomePage: React.FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [surprise, setSurprise] = useState(false)
  const [order, setOrder] = useState("Lowest Number First")
  const [isBottom, setIsBottom] = useState(false)

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
        setIsBottom(false)
        dispatch({
          type: FETCH_POKEDEX_SUCCESS,
          payload: res,
        })
      })
      .catch((err) => {
        console.error(FETCH_POKEDEX_ERROR, err)
        setIsBottom(false)
        dispatch({
          type: FETCH_POKEDEX_ERROR,
          payload: "An Error Occurred! Please Try Again.",
        })
      })
  }, [dispatch, url])

  const sortOptions = [
    {
      value: "Lowest Number First",
      label: "Lowest Number (First)",
    },
    {
      value: "Highest Number First",
      label: "Highest Number (First)",
    },
    {
      value: "A - Z",
      label: "A - Z",
    },
    {
      value: "Z - A",
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

      const slug = `/pokemon/${randomNumber}`

      history.push(slug)
    }, wait)
  }

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true)
    }
  }

  useEffect(() => {
    if (isEmpty(pokemonList)) {
      handleFetch()
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleFetch]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isBottom && !loading) {
      handleFetch()
    }
  }, [handleFetch, isBottom]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <SEO
        title="Home"
        description="Pokédex is a mini-encyclopedia of Pokémon species, types etc."
        image="https://pokedex.theleakycauldronblog.com/logo192.png"
        url="https://pokedex.theleakycauldronblog.com"
      />

      <Box paddingY={3}>
        <Box
          padding={2}
          margin={1}
          display="flex"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading size="lg">POKéMON</Heading>
          <Heading size="sm">gotta catch'em all</Heading>
        </Box>

        <Divider />

        <Box
          padding={2}
          margin={1}
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

        {/* TODO Add Virtualized Grid Loader */}
        {!isEmpty(pokemonList) && <PokemonGrid pokemons={pokemonList} />}

        {error && !loading && <ErrorBox message={error} />}

        <Box paddingY={6}>
          <Spinner accessibilityLabel="Loading..." show={loading} />
        </Box>
      </Box>
    </>
  )
}

export default HomePage
