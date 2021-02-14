import React from "react"
import { Badge, Box, Divider, GroupAvatar, Heading, Mask, Text } from "gestalt"
import { find, get, capitalize, upperCase } from "lodash"
import { pokemonIDGenerator } from "../../../utils"
import { Pokemon } from "../../types/pokemon.types"
import SEO from "../SEO"
import StatsBox from "../StatsBox"
import FlavorTextBox from "../FlavorTextBox"
import DataTableBox from "../DataTableBox"

interface IProps {
  pokemon: Pokemon
}

const PokemonDetails: React.FunctionComponent<IProps> = (props) => {
  const { pokemon } = props

  const name = capitalize(get(pokemon, ["name"]))
  const frontDefaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get(
    pokemon,
    ["id"]
  )}.png`
  const backDefaultSprite = get(pokemon, ["sprites", "back_default"])
  const image =
    get(pokemon, ["sprites", "other", "official-artwork", "front_default"]) ||
    frontDefaultSprite
  const pokemonID = pokemonIDGenerator(get(pokemon, ["id"]))
  const height = get(pokemon, ["height"]) / 10
  const weight = get(pokemon, ["weight"]) / 10
  const abilities = get(pokemon, ["abilities"])
  const types = get(pokemon, ["types"])
  const flavorTextEntries = get(pokemon, ["species", "flavor_text_entries"])
  const blueEntry = find(flavorTextEntries, { version: { name: "blue" } })
  const flavorText = get(blueEntry, ["flavor_text"])
  const stats = get(pokemon, ["stats"])
  const shape = upperCase(get(pokemon, ["species", "shape", "name"]))
  const isBaby = get(pokemon, ["species", "is_baby"])
  const isLegendary = get(pokemon, ["species", "is_legendary"])
  const isMythical = get(pokemon, ["species", "is_mythical"])

  return (
    <>
      <SEO
        title={name}
        description={`${name} - ${flavorText}`}
        image={image}
        url={`https://react-pokedex.netlify.app/pokemon/${name}`}
      />
      <Box margin={1} rounding={2} borderStyle="sm">
        <Box display="flex" alignItems="center" padding={3}>
          <Box paddingX={2}>
            <GroupAvatar
              size="md"
              collaborators={[
                { name, src: frontDefaultSprite },
                { name, src: backDefaultSprite },
              ]}
            />
          </Box>
          <Box paddingX={2}>
            <Heading>
              {name}{" "}
              {(isBaby || isLegendary || isMythical) && (
                <Badge
                  text={`${isBaby ? "Baby" : ""}${
                    isLegendary ? "Legendary" : ""
                  }${isMythical ? "Mythical" : ""}`}
                  position="top"
                />
              )}
            </Heading>
            <Text color="gray">#{pokemonID}</Text>
          </Box>
        </Box>

        <Divider />

        <Box display="flex" justifyContent="center" alignItems="center">
          <Mask rounding={2} wash>
            <img
              alt={name}
              src={image}
              style={{ maxWidth: "100%", display: "block" }}
            />
          </Mask>
        </Box>

        <Divider />

        <Box
          paddingX={3}
          paddingY={2}
          display="flex"
          justifyContent="around"
          alignItems="center"
        >
          {types.map((item: object) => {
            const pokemonType = get(item, ["type", "name"])

            return (
              <span
                key={pokemonType}
                className={`pokemon-type-mini ${pokemonType}`}
              >
                {pokemonType}
              </span>
            )
          })}
        </Box>
      </Box>

      <FlavorTextBox flavorText={flavorText} />

      <DataTableBox
        height={height}
        weight={weight}
        abilities={abilities}
        shape={shape}
      />

      <StatsBox stats={stats} />
    </>
  )
}

export default PokemonDetails
