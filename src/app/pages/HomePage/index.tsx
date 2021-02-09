import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { isEmpty, random } from "lodash"
import { RootState } from "../../reducers"
import {
  FETCH_POKEDEX_ERROR,
  FETCH_POKEDEX_REQUEST,
  FETCH_POKEDEX_SUCCESS,
  SORT_POKEMONS,
} from "../../constants"
import { fetchPokemons, sortPokemons } from "../../actions/pokedex.action"
import SEO from "../../components/SEO"
import Spinner from "../../components/Spinner"
import PokemonGrid from "../../components/PokemonGrid"

const HomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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

  const handleFetch = (nextURL: string) => {
    if (loading) return

    dispatch({
      type: FETCH_POKEDEX_REQUEST,
    })

    fetchPokemons(nextURL)
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
          payload: "An Error Occurred! Please Try Again.",
        })
      })

    setIsBottom(false)
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value)

    const orderBy = e.target.value

    const payload = sortPokemons(pokemonList, orderBy)

    dispatch({
      type: SORT_POKEMONS,
      payload,
    })
  }

  const handleSurprise = () => {
    setSurprise(true)

    setTimeout(() => {
      const randomNumber = random(1, 898)

      const slug = `/pokemon/${randomNumber}`

      history.push(slug)
    }, 3000)
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
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isBottom) {
      handleFetch(url)
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

      <section className="section">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <h1 className="title">POKéMON</h1>

              <h2 className="heading">gotta catch'em all</h2>
            </div>
          </div>
        </nav>

        <div className="columns">
          <div className="column is-half">
            <button
              type="button"
              className={`button is-info is-fullwidth ${
                surprise ? "is-loading" : "is-light"
              }`}
              onClick={handleSurprise}
              disabled={surprise}
            >
              Surprise Me!
            </button>
          </div>

          <div className="column is-half">
            <div className="field is-horizontal is-grouped is-grouped-right">
              <div className="control is-fullwidth">
                <div className="field-body is-fullwidth">
                  <label className="label is-hidden" htmlFor="#sort">
                    Sort
                  </label>

                  <div id="sort" className="select is-primary">
                    <select value={order} onChange={handleSort}>
                      <option>Lowest Number First</option>

                      <option>Highest Number First</option>

                      <option>A - Z</option>

                      <option>Z - A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!error && !isEmpty(pokemonList) && (
          <PokemonGrid pokemons={pokemonList} />
        )}

        {loading && <Spinner />}
      </section>
    </>
  )
}

export default HomePage
