import React from "react";
import { find, get } from "lodash";
import { pokemonIDGenerator } from "../../../utils";
import { Pokemon } from "../../types/pokemon.types";
import SpriteBox from "../SpriteBox";
import StatsBox from "../StatsBox";
import SEO from "../SEO";
import ArtBox from "../ArtBox";

interface Props {
  pokemon: Pokemon;
}

const PokemonLayout: React.FunctionComponent<Props> = (props) => {
  const { pokemon } = props;

  const name = get(pokemon, ["name"]);
  const image = get(pokemon, [
    "sprites",
    "other",
    "official-artwork",
    "front_default",
  ]);
  const sprites = get(pokemon, ["sprites"]);
  const pokemonID = pokemonIDGenerator(get(pokemon, ["id"]));
  const height = get(pokemon, ["height"]) / 10;
  const weight = get(pokemon, ["weight"]) / 10;
  const abilities = get(pokemon, ["abilities"]);
  const types = get(pokemon, ["types"]);
  const flavorTextEntries = get(pokemon, ["species", "flavor_text_entries"]);
  const englishEntry = find(flavorTextEntries, { language: { name: "en" } });
  const flavorText = get(englishEntry, ["flavor_text"]);
  const stats = get(pokemon, ["stats"]);
  const shape = get(pokemon, ["species", "shape", "name"]);

  return (
    <>
      <SEO
        title={name.toUpperCase()}
        description={`${name.toUpperCase()} - ${flavorText}`}
        image={image}
        url={`https://pokedex.theleakycauldronblog.com/pokemon/${name}`}
      />

      <div className="columns">
        <div className="column is-two-fifths">
          <ArtBox name={name} image={image} types={types} />
        </div>
        <div className="column is-three-fifths">
          <div className="box">
            <div className="columns is-mobile">
              <div className="column is-2-tablet is-3-mobile">
                <SpriteBox name={name} sprites={sprites} />
              </div>
              <div className="column">
                <h1 className="title is-capitalized">
                  {get(pokemon, ["name"])}
                </h1>
                <h2 className="subtitle">#{pokemonID}</h2>
              </div>
            </div>
          </div>

          <article className="message is-dark">
            <div className="message-body">{flavorText}</div>
          </article>

          <div className="box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>
                    Abilities:{" "}
                    {abilities.map((ability, idx) => {
                      const abilityName = get(ability, ["ability", "name"]);
                      return (
                        <span
                          key={idx}
                          className="has-text-weight-semibold is-capitalized"
                        >
                          {abilityName},&nbsp;
                        </span>
                      );
                    })}
                  </p>

                  <p>
                    Height:{" "}
                    <span className="has-text-weight-semibold is-capitalized">
                      {height} m
                    </span>
                  </p>

                  <p>
                    Weight:{" "}
                    <span className="has-text-weight-semibold is-capitalized">
                      {weight} kg
                    </span>
                  </p>

                  <p>
                    Shape:{" "}
                    <span className="has-text-weight-semibold is-capitalized">
                      {shape}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          </div>

          <hr />
        </div>
      </div>

      <StatsBox stats={stats} />
    </>
  );
};

export default PokemonLayout;
