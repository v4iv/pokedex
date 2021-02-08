import React, {FunctionComponent} from 'react';
import {Pokemon} from "../../types/pokemon.types";
import PokemonCard from "../PokemonCard";

interface Props {
    pokemons: Pokemon[]
}

const PokemonGrid: FunctionComponent<Props> = (props) => {
    const {pokemons} = props

    return (
        <div className="columns is-multiline is-centered">
            {pokemons.map((pokemon, idx) => {
                return <PokemonCard key={idx} pokemon={pokemon}/>
            })}
        </div>
    );
};

export default PokemonGrid;
