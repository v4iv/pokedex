import React, {useState, useEffect, FunctionComponent, ChangeEvent} from 'react';
import Helmet from 'react-helmet'
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from 'lodash'
import {RootState} from "../../reducers";
import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS, SORT_POKEMONS} from "../../constants";
import {fetchPokedex, sortPokemons} from "../../actions/pokedex.action";
import Spinner from "../../components/Spinner";
import PokemonGrid from "../../components/PokemonGrid";


const HomePage: FunctionComponent = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [order, setOrder] = useState('Lowest Number First')
    const dispatch = useDispatch()

    const {pokemon_list, next, error, loading} = useSelector((state: RootState) => ({
        pokemon_list: state.pokedex.pokemon_list,
        next: state.pokedex.next,
        error: state.pokedex.error,
        loading: state.pokedex.loading
    }))

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        (async () => {
            if(loading) return

            dispatch({
                type: FETCH_POKEDEX_REQUEST
            })

            try {
                const payload = await fetchPokedex(next)

                dispatch({
                    type: FETCH_POKEDEX_SUCCESS,
                    payload: payload
                })
            } catch (err) {
                dispatch({
                    type: FETCH_POKEDEX_ERROR,
                    payload: "An Error Occurred! Please Try Again."
                })
            }
        })()

        setIsFetching(false)
    }, [dispatch, isFetching]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value)

        let orderBy = e.target.value

        const payload = sortPokemons(pokemon_list, orderBy)

        dispatch({
            type: SORT_POKEMONS,
            payload: payload
        })
    }

    return (
        <>
            <Helmet>
                <title>POKéDEX &middot; The POKéMON Encyclopedia</title>

                <meta name="description" content="Pokédex is a mini-encyclopedia of Pokémon species, types etc." />

                {/* Twitter Card tags */}
                <meta name='twitter:card' content='summary' />

                <meta name='twitter:site' content={`https://pokedex.theleakycauldronblog.com`} />

                <meta name='twitter:title' content={`POKéDEX - The POKéMON Encyclopedia`} />

                <meta name='twitter:description' content={`Pokédex is a mini-encyclopedia of Pokémon species, types etc.`} />

                <meta name='twitter:image' content={`https://pokedex.theleakycauldronblog.com/logo192.png`} />

                {/* OpenGraph tags */}
                <meta property='og:url' content={`https://pokedex.theleakycauldronblog.com`} />

                <meta property='og:title' content={`POKéDEX - The POKéMON Encyclopedia`} />

                <meta property='og:author' content={'POKéMON'} />

                <meta property='og:description' content={`Pokédex is a mini-encyclopedia of Pokémon species, types etc.`} />

                <meta property='og:image' content={`https://pokedex.theleakycauldronblog.com/logo192.png`} />
            </Helmet>

            <section className='section'>
                <nav className='level'>
                    <div className='level-item has-text-centered'>
                        <div>
                            <h1 className="title">POKéMON</h1>

                            <h2 className="heading">gotta catch'em all</h2>
                        </div>
                    </div>
                </nav>

                <div className='columns'>
                    <div className='column is-half'>
                        <button className="button is-info is-light is-fullwidth">Surprise Me!</button>
                    </div>

                    <div className='column is-half'>
                        <div className="field is-horizontal is-grouped is-grouped-right">
                            <div className="control is-fullwidth">
                                <div className="field-body is-fullwidth">
                                    <label className='label is-hidden'>Sort</label>

                                    <div className="select is-primary">
                                        <select
                                            value={order}
                                            onChange={handleSort}
                                        >
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

                {(!error && !isEmpty(pokemon_list)) && <PokemonGrid pokemons={pokemon_list}/>}

                {loading && <Spinner/>}
            </section>
        </>
    );
};

export default HomePage;
