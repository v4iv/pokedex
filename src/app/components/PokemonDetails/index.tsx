import React from "react"
import { Box, Divider, GroupAvatar, Heading, Mask, Text } from "gestalt"
import { find, get, capitalize } from "lodash"
import { pokemonIDGenerator } from "../../../utils"
import { Pokemon } from "../../types/pokemon.types"
import SEO from "../SEO"
import StatsBox from "../StatsBox"

interface IProps {
  pokemon: Pokemon
}

const PokemonDetails: React.FunctionComponent<IProps> = (props) => {
  const { pokemon } = props

  const name = capitalize(get(pokemon, ["name"]))
  const frontDefaultSprite = get(pokemon, ["sprites", "front_default"])
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
  const englishEntry = find(flavorTextEntries, { language: { name: "en" } })
  const flavorText = get(englishEntry, ["flavor_text"])
  const stats = get(pokemon, ["stats"])
  const shape = get(pokemon, ["species", "shape", "name"])
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
            <Heading>{name}</Heading>
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

      <Box margin={1} rounding={2} borderStyle="sm" paddingX={3} paddingY={5}>
        <Text weight="bold">{flavorText}</Text>
      </Box>

      <StatsBox stats={stats} />
    </>
  )
}

export default PokemonDetails
