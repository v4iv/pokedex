/**
 * Created by vaibhav on 14/5/18
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actions from './actions';
import ErrorPanel from '../../components/ErrorPanel';
import PokemonCard from "../../components/PokemonCard";

class Pokemon extends Component {
    componentDidMount() {
        this.props.actions.fetchPokemon(this.props.match.params.pokemon);
    }

    render() {
        const {pokemonObject} = this.props;
        return (
            <div className="container">
                {(pokemonObject.loading)
                    ? undefined
                    : (pokemonObject.error)
                        ? <ErrorPanel errors={[pokemonObject.error]}/>
                        : <PokemonCard pokemon={pokemonObject.pokemon}/>
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