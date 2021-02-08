import React, {FunctionComponent} from 'react';
import Helmet from "react-helmet";
import {get, find} from "lodash";
import {pokemon_id_generator} from "../../../utils";
import {Pokemon} from "../../types/pokemon.types";
import SpriteBox from "../SpriteBox";
import StatsBox from "../StatsBox";

interface Props {
    pokemon: Pokemon
}

const PokemonLayout: FunctionComponent<Props> = (props) => {
    const {pokemon} = props

    const name = get(pokemon, ['name'])
    const image = get(pokemon, ['sprites', 'other', 'official-artwork', 'front_default'])
    const sprites = get(pokemon, ['sprites'])
    const pokemon_id = pokemon_id_generator(get(pokemon, ['id']))
    const height = get(pokemon, ['height']) / 10
    const weight = get(pokemon, ['weight']) / 10
    const abilities = get(pokemon, ['abilities'])
    const types = get(pokemon, ['types'])
    const flavor_text_entries = get(pokemon, ['species', 'flavor_text_entries'])
    const english_entry = find(flavor_text_entries, {language: {name: 'en'}})
    const flavor_text = get(english_entry, ['flavor_text'])
    const stats = get(pokemon, ['stats'])
    const shape = get(pokemon, ['species', 'shape', 'name'])

    return (
        <>
            <Helmet>
                <title>{name} &middot; POKéDEX &middot; The POKéMON Encyclopedia</title>

                <meta name="description" content={`${name} - ${flavor_text}`} />

                {/* Twitter Card tags */}
                <meta name='twitter:card' content='summary' />

                <meta name='twitter:site' content={`https://pokedex.theleakycauldronblog.com/pokemon/${name}`} />

                <meta name='twitter:title' content={`${name} | POKéDEX - The POKéMON Encyclopedia`} />

                <meta name='twitter:description' content={`${name} - ${flavor_text}`} />

                <meta name='twitter:image' content={image} />

                {/* OpenGraph tags */}
                <meta property='og:url' content={`https://pokedex.theleakycauldronblog.com/pokemon/${name}`} />

                <meta property='og:title' content={`${name} | POKéDEX - The POKéMON Encyclopedia`} />

                <meta property='og:author' content={'POKéMON'} />

                <meta property='og:description' content={`${name} - ${flavor_text}`} />

                <meta property='og:image' content={`https://pokedex.theleakycauldronblog.com/logo192.png`} />
            </Helmet>

            <div className='columns is-vcentered'>
                <div className='column is-one-quarter'>
                    <SpriteBox name={name} sprites={sprites} types={types}/>
                </div>
                <div className='column is-three-quarters'>
                    <div className='box'>
                        <h1 className='title is-capitalized'>{get(pokemon, ['name'])}</h1>
                        <h2 className='subtitle'>#{pokemon_id}</h2>
                    </div>

                    <div className='box'>
                        <article className="media">
                            <div className="media-content">
                                <div className="content">
                                    <p>Abilities: {abilities.map((ability, idx) => {
                                        const ability_name = get(ability, ['ability', 'name'])
                                        return <span key={idx} className='has-text-weight-semibold is-capitalized'>{ability_name},&nbsp;</span>
                                    })}</p>

                                    <p>Height: <span className='has-text-weight-semibold is-capitalized'>{height} m</span></p>

                                    <p>Weight: <span className='has-text-weight-semibold is-capitalized'>{weight} kg</span></p>

                                    <p>Shape: <span className='has-text-weight-semibold is-capitalized'>{shape}</span></p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <article className="message is-dark">
                <div className="message-body">
                    {flavor_text}
                </div>
            </article>

            <StatsBox stats={stats}/>
        </>
    );
};

export default PokemonLayout;
