/**
 * Created by vaibhav on 14/5/18
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from './actions';
import ErrorPanel from '../../components/ErrorPanel';

class Pokemon extends Component {
    componentDidMount() {
        this.props.actions.fetchPokemon(this.props.match.params.pokemon);
    }

    render() {
        const {pokemonObject} = this.props;
        let id_string = "" + pokemonObject.pokemon.id;
        let filler = "000";
        let pokemon_id = filler.substring(0, filler.length - id_string.length) + id_string;
        return (
            <div className="container">
                {(pokemonObject.loading)
                    ? undefined
                    : (pokemonObject.error)
                        ? <ErrorPanel errors={[pokemonObject.error]}/>
                        : <section className="section">
                            <div className="columns">
                                <div className="column is-one-fourth">
                                    <div className="card">
                                        <div className="card-image">
                                            <figure className="image is-2by2 has-background-light">
                                                <img async src={pokemonObject.pokemon.sprites.front_default}
                                                     alt={pokemonObject.pokemon.name}/>
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <div className="media">
                                                <div className="media-content">
                                                    <p className="subtitle is-6 has-text-grey">#{pokemon_id}</p>
                                                    <p className="title is-4 is-capitalized">
                                                        <span
                                                            className="has-text-black">
                                                            {pokemonObject.pokemon.name}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <footer className="card-footer">
                                            {pokemonObject.pokemon.types.map((item, index) =>
                                                <span key={index}
                                                      className={`card-footer-item is-uppercase ${item.type.name}`}>
                                                            {item.type.name}
                                                        </span>
                                            )}
                                        </footer>
                                    </div>
                                </div>
                                <div className="column is-two-thirds">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="columns">
                                                <div className="column is-half">
                                                    <p>Height</p>
                                                    <p>{pokemonObject.pokemon.height / 10} m</p>
                                                    <p>Weight</p>
                                                    <p>{pokemonObject.pokemon.weight / 10} kg</p>
                                                </div>
                                                <div className="column is-half">
                                                    <p>Abilities</p>
                                                    {Object.values(pokemonObject.pokemon.abilities).map((ability, index) => {
                                                        return <p key={index}
                                                                  className="is-capitalized">{ability.ability.name}</p>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <p className="card-header-title">
                                                Stats
                                            </p>
                                        </div>
                                        <div className="card-content">
                                            {Object.values(pokemonObject.pokemon.stats).map((stat, index) =>
                                                <div key={index}>
                                                    <p className="has-text-grey is-uppercase is-4">{stat.stat.name}</p>

                                                    <progress className="progress is-primary" value={stat.base_stat}
                                                              max="100">{stat.base_stat}%
                                                    </progress>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">
                                        Sprites
                                    </p>
                                </div>
                               <div className="columns">
                                   {Object.values(pokemonObject.pokemon.sprites)
                                       .filter(sprite => sprite !== null)
                                       .map((sprite, index) => {
                                               return (
                                                   <div className="column" key={index}>
                                                       <figure className="image is-2by2">
                                                           <img async src={sprite}
                                                                alt={pokemonObject.pokemon.name}/>
                                                       </figure>
                                                   </div>
                                               )
                                           }
                                       )}
                               </div>
                            </div>
                        </section>
                }
                {(pokemonObject.loading)
                    ? <section className="section"><span className="loader" style={{margin: "0 auto"}}/></section>
                    : (pokemonObject.error)
                        ? <ErrorPanel errors={[pokemonObject.error]}/>
                        : undefined
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pokemonObject: state.pokemonReducer.pokemonObject
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

const PokemonContainer = connect(mapStateToProps, mapDispatchToProps)(Pokemon);

export default withRouter(PokemonContainer);