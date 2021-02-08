import React, {useState, useEffect, FunctionComponent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from 'lodash'
import {RootState} from "../../reducers";
import {fetchPokedex} from "../../actions/pokedex.action";
import {FETCH_POKEDEX_ERROR, FETCH_POKEDEX_REQUEST, FETCH_POKEDEX_SUCCESS} from "../../constants";
import Spinner from "../../components/Spinner";
import PokemonGrid from "../../components/PokemonGrid";


const HomePage: FunctionComponent = () => {
    const [isFetching, setIsFetching] = useState(false);
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

                setIsFetching(false)
            } catch (err) {
                dispatch({
                    type: FETCH_POKEDEX_ERROR,
                    payload: "An Error Occurred!"
                })
            }
        })()
    }, [dispatch, isFetching])

    return (
        <>
            <section className='section'>
                {(!error && !isEmpty(pokemon_list)) && <PokemonGrid pokemons={pokemon_list}/>}

                {loading && <Spinner/>}
            </section>
        </>
    );
};

export default HomePage;
