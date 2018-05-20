/**
 * Created by vaibhav on 14/5/18
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from './actions';
import ErrorPanel from '../../components/ErrorPanel';
import SpritesCard from "../../components/SpritesCard";
import StatsCard from "../../components/StatsCard";
import DetailCard from "../../components/DetailCard";
import SpecieCard from "../../components/SpecieCard";

class Pokemon extends Component {
    componentDidMount() {
        this.props.actions.fetchPokemon(this.props.match.params.pokemon);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.pokemon !== this.props.match.params.pokemon) {
            this.props.actions.fetchPokemon(nextProps.match.params.pokemon);
        }
    }


    render() {
        const {pokemonObject, specieObject} = this.props;
        const flavor = Object.values(specieObject.specie.flavor_text_entries).pop();
        const genera = specieObject.specie.genera[2];
        return (
            <div className="container">
                {(pokemonObject.loading)
                    ? undefined
                    : (pokemonObject.error)
                        ? <ErrorPanel errors={[pokemonObject.error]}/>
                        : <section className="section">
                            <div className="columns">
                                <div className="column is-one-fourth">
                                    <SpecieCard
                                        number={pokemonObject.pokemon.id}
                                        name={pokemonObject.pokemon.name}
                                        image={pokemonObject.pokemon.sprites.front_default}
                                        types={pokemonObject.pokemon.types}
                                        flavor_text={flavor.flavor_text}
                                    />
                                </div>
                                <div className="column is-two-thirds">
                                    <DetailCard
                                        height={pokemonObject.pokemon.height}
                                        weight={pokemonObject.pokemon.weight}
                                        category={(genera) ? genera.genus : "-"}
                                        ablities={Object.values(pokemonObject.pokemon.abilities)}
                                    />
                                    <StatsCard stats={Object.values(pokemonObject.pokemon.stats)}/>
                                </div>
                            </div>
                            <SpritesCard
                                sprites={Object.values(pokemonObject.pokemon.sprites)}
                                name={pokemonObject.pokemon.name}
                            />
                        </section>
                }
                {(pokemonObject.loading)
                    ? <section className="section"><span className="loader" style={{margin: "0 auto"}}/></section>
                    : (pokemonObject.error)
                        ? <ErrorPanel errors={[`${pokemonObject.error}`]}/>
                        : undefined
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pokemonObject: state.pokemonReducer.pokemonObject,
        specieObject: state.pokemonReducer.specieObject
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

const PokemonContainer = connect(mapStateToProps, mapDispatchToProps)(Pokemon);

export default withRouter(PokemonContainer);