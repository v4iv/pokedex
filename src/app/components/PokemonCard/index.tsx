import React from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { Pokemon } from "../../types/pokemon.types";
import { pokemonIDGenerator } from "../../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FunctionComponent<Props> = (props) => {
  const { pokemon } = props;

  const name = get(pokemon, ["name"]);
  const image = get(pokemon, ["sprites", "front_default"]);
  const pokemonID = pokemonIDGenerator(get(pokemon, ["id"]));
  const height = get(pokemon, ["height"]) / 10;
  const weight = get(pokemon, ["weight"]) / 10;
  const types = get(pokemon, ["types"]);

  return (
    <div className="column is-one-third">
      <div className="box">
        <div className="card-image">
          <figure className="image is-2by2 has-background-light">
            <Link to={`/pokemon/${name}/`}>
              <img src={image} alt={name} />
            </Link>
          </figure>
        </div>

        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-6 has-text-grey">#{pokemonID}</p>

              <p className="title is-4 is-capitalized">
                <Link to={`/pokemon/${name}/`} className="has-text-black">
                  {name}
                </Link>
              </p>

              <p className="is-3">Height: {height} m</p>

              <p className="is-3">Weight: {weight} kg</p>
            </div>
          </div>
        </div>

        <footer className="card-footer">
          {types.map((item: object, idx: number) => {
            const pokemonType = get(item, ["type", "name"]);

            return (
              <span
                key={idx}
                className={`card-footer-item is-uppercase ${pokemonType}`}
              >
                {pokemonType}
              </span>
            );
          })}
        </footer>
      </div>
    </div>
  );
};

export default PokemonCard;
