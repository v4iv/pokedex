/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const PokemonCard = ({pokemon}) => {
    let id_string = "" + pokemon.id;
    let filler = "000";
    let pokemon_id = filler.substring(0, filler.length - id_string.length) + id_string;
    return (
        <div className="column is-one-third">
            <div className="box">
                <div className="card-image">
                    <figure className="image is-2by2 has-background-light">
                        <Link to={`/pokemon/${pokemon.name}/`}>
                            <img async src={pokemon.sprites.front_default} alt={pokemon.name}/>
                        </Link>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="subtitle is-6 has-text-grey">#{pokemon_id}</p>
                            <p className="title is-4 is-capitalized">
                                <Link to={`/pokemon/${pokemon.name}/`} className="has-text-black">
                                    {pokemon.name}
                                </Link>
                            </p>
                            <p className="is-3">Height: {pokemon.height / 10} m</p>
                            <p className="is-3">Weight: {pokemon.weight / 10} kg</p>
                        </div>
                    </div>
                </div>
                <footer className="card-footer">
                    {pokemon.types.map((item, index) =>
                        <span key={index}
                              className={`card-footer-item is-uppercase ${item.type.name}`}>
                            {item.type.name}
                        </span>
                    )}
                </footer>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.object.isRequired
};

export default PokemonCard;
