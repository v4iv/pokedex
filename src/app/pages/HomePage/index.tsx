import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import isEmpty from 'lodash/isEmpty'
import random from 'lodash/random'
import {
  Box,
  Button,
  Divider,
  SelectList,
  SelectListProps,
  Spinner,
} from 'gestalt'
import {RootState} from '../../reducers'
import {
  FETCH_POKEDEX_ERROR,
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  SORT_POKEMONS,
} from '../../constants/pokedex.constants'
import {
  fetchPokemonsAction,
  sortPokemonsAction,
} from '../../actions/pokedex.action'
import SEO from '../../components/SEO'
// Lazy Load
const PokemonGrid = lazy(() => import('../../components/PokemonGrid'))
const ErrorToast = lazy(() => import('../../components/ErrorToast'))

const HomePage: React.FunctionComponent = () => {
  const {t} = useTranslation(['common'])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [surprise, setSurprise] = useState(false)
  const [order, setOrder] = useState('lowest_number_first')

  const {pokemonList, url, error, loading} = useSelector(
    (state: RootState) => ({
      pokemonList: state.pokedex.pokemonList,
      url: state.pokedex.url,
      error: state.pokedex.error,
      loading: state.pokedex.loading,
    }),
  )

  const handleFetch = useCallback(() => {
    dispatch({
      type: FETCH_POKEDEX_REQUEST,
    })

    fetchPokemonsAction(url)
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
          payload: 'Oops! Something went wrong. Please try again later.',
        })
      })
  }, [dispatch, url])

  const sortOptions = [
    {
      value: 'lowest_number_first',
      label: t('common:sortOptions.lowest-number-first'),
    },
    {
      value: 'highest_number_first',
      label: t('common:sortOptions.highest-number-first'),
    },
    {
      value: 'z_a',
      label: t('common:sortOptions.z-a'),
    },
    {
      value: 'a_z',
      label: t('common:sortOptions.a-z'),
    },
  ]

  const handleSort: SelectListProps['onChange'] = ({value}) => {
    setOrder(value)

    const payload = sortPokemonsAction(pokemonList, value)

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

      navigate(slug)
    }, wait)
  }

  useEffect(() => {
    if (isEmpty(pokemonList)) {
      handleFetch()
    }
  }, [handleFetch])

  return (
    <>
      <SEO
        title="Home"
        description="Pokédex is a mini-encyclopedia of Pokémon species, types etc."
        image={`${process.env.REACT_APP_URL}/logo192.png`}
        url={`${process.env.REACT_APP_URL}`}
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
                accessibilityLabel={t('common:loading-surprise')}
                show={surprise}
              />
            ) : (
              <Button
                name="Surprise"
                color="blue"
                onClick={handleSurprise}
                text={t('common:surprise-me')}
                disabled={surprise}
                fullWidth
              />
            )}
          </Box>
          <Box margin={1} column={6}>
            <SelectList
              id="sort"
              name="Sort"
              onChange={handleSort}
              options={sortOptions}
              placeholder={t('common:sort-by')}
              value={order}
            />
          </Box>
        </Box>

        <Divider />

        {!isEmpty(pokemonList) && (
          <Suspense
            fallback={
              <Box paddingY={6}>
                <Spinner accessibilityLabel={t('common:loading')} show />
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
                <Spinner accessibilityLabel={t('common:loading')} show />
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
