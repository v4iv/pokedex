import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {isEmpty} from 'lodash';
import {RootState} from "../../reducers";
import {Pokemon} from "../../types/pokemon.types";
import {fetchPokemon} from "../../actions/pokemon.action";
import {FETCH_POKEMON_ERROR, FETCH_POKEMON_REQUEST, FETCH_POKEMON_SUCCESS} from "../../constants";
import Spinner from "../../components/Spinner";
import PokemonLayout from "../../components/PokemonLayout";

interface ParamTypes {
    slug: string
}

const PokemonPage: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { slug } = useParams<ParamTypes>();

    const {pokemon, error, loading} = useSelector((state: RootState) => ({
        pokemon: state.pokemon.pokemon,
        error: state.pokemon.error,
        loading: state.pokemon.loading
    }))

    useEffect(() => {
        (async () => {
            dispatch({
                type: FETCH_POKEMON_REQUEST
            })

            try {
                const payload: Pokemon = await fetchPokemon(slug)

                dispatch({
                    type: FETCH_POKEMON_SUCCESS,
                    payload: payload
                })
            } catch (err) {
                dispatch({
                    type: FETCH_POKEMON_ERROR,
                    payload: "An Error Occurred! Please Try Again."
                })
            }
        })()
    }, [dispatch, slug])

    return (
        <>
            <section className='section'>
                {!error && !isEmpty(pokemon) && <PokemonLayout pokemon={pokemon}/>}

                {loading && <Spinner/>}
            </section>
        </>
    );
}

export default PokemonPage;
