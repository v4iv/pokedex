import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {get} from 'lodash'
import {pokemon_id_generator} from "../../../utils";
import {Pokemon} from "../../types/pokedex.types";

type Props = {
    pokemon: Pokemon
}

const PokemonCard: FunctionComponent<Props> = (props) => {
    const {pokemon} = props

    const name = get(pokemon, ['name'])
    const icon = get(pokemon, ['sprites', 'front_default'])
    const pokemon_id = pokemon_id_generator(get(pokemon, ['id']))
    const height = get(pokemon, ['height'])
    const weight = get(pokemon, ['weight'])
    const types = get(pokemon, ['types'])

    return (
        <div className="column is-one-third">
            <div className="box">
                <div className="card-image">
                    <figure className="image is-2by2 has-background-light">
                        <img src={icon} alt={name}/>
                    </figure>
                </div>

                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="subtitle is-6 has-text-grey">#{pokemon_id}</p>

                            <p className="title is-4 is-capitalized">
                                {name}
                            </p>

                            <p className="is-3">Height: {height / 10} m</p>

                            <p className="is-3">Weight: {weight / 10} kg</p>
                        </div>
                    </div>
                </div>

                <footer className="card-footer">
                    {types.map((item: object, idx: number) => {
                        const pokemon_type = get(item, ['type', 'name'])

                        return <span key={idx}
                                     className={`card-footer-item is-uppercase ${pokemon_type}`}>{pokemon_type}</span>
                    })}
                </footer>
            </div>
        </div>
    );
};

export default PokemonCard;
