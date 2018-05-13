/**
 * Created by vaibhav on 16/4/18
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as $ from 'jquery'
import * as actions from '../../store/actions/pokemonActions';
import Loader from "../../components/Loader";
import PokemonCard from "../../components/PokemonCard";
import ErrorPanel from '../../components/ErrorPanel';

class PokemonList extends Component {
    componentWillMount() {
        this.props.actions.fetchPokemonList(24, 0);
    }

    componentDidMount() {
        $(window).scroll(function () {
            if ($(window).scrollTop() === $(document).height() - $(window).height() && !this.props.pokemonList.loading) {
                this.props.actions.fetchPokemonList(24, Object.values(this.props.pokemonList.pokemons).length + 24);
            }
        }.bind(this));
    }

    render() {
        const {pokemonList} = this.props;
        return (
            <section className="section ">
                {(pokemonList.error)
                    ? <ErrorPanel errors={[pokemonList.error.message]}/>
                    : Object.values(pokemonList.pokemons).map((items, index) => {
                            return index % 4 === 0
                                ? <div className="columns is-centered" key={index}>
                                    {
                                        Object.values(pokemonList.pokemons).slice(index, index + 4).map(pokemon =>
                                            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                                        )}
                                </div>
                                : undefined;
                        }
                    )}
                {(pokemonList.loading)
                    ? <Loader/>
                    : undefined
                }
            </section>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        pokemonList: state.pokemonReducer.pokemonList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

const PokemonListContainer = connect(mapStateToProps, mapDispatchToProps)(PokemonList);

export default withRouter(PokemonListContainer);