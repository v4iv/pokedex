import React, {useState, useEffect, FunctionComponent, ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from 'lodash'
import {RootState} from "../../reducers";
import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS, SORT_POKEMONS} from "../../constants";
import {fetchPokedex} from "../../actions/pokedex.action";
import Spinner from "../../components/Spinner";
import PokemonGrid from "../../components/PokemonGrid";
import {Pokemon} from "../../types/pokedex.types";


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
                    payload: "An Error Occurred!"
                })
            }
        })()

        setIsFetching(false)
    }, [dispatch, isFetching]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrder(e.target.value)

        let orderBy = e.target.value

        const payload = pokemon_list.sort((param1: Pokemon, param2: Pokemon) => {
            switch (orderBy) {
                case "Lowest Number First":
                    return param1.id - param2.id;

                case "Highest Number First":
                    return param2.id - param1.id;

                case "Z - A":
                    return param2.name.localeCompare(param1.name);

                case "A - Z":
                    return param1.name.localeCompare(param2.name);

                default:
                    return param1.id - param2.id;
            }
        })

        dispatch({
            type: SORT_POKEMONS,
            payload: payload
        })
    }

    return (
        <>
            <section className='section'>
                <div className="field is-horizontal is-grouped is-grouped-right">
                    <div className="control">
                        <div className="field-body">
                            <div className="select is-primary is-rounded">
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

                {(!error && !isEmpty(pokemon_list)) && <PokemonGrid pokemons={pokemon_list}/>}

                {loading && <Spinner/>}
            </section>
        </>
    );
};

export default HomePage;
