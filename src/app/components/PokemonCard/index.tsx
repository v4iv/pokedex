import React from "react"
import { get } from "lodash"
import { Avatar, Box, Card, Heading, Text } from "gestalt"
import { Pokemon } from "../../types/pokemon.types"
import { pokemonIDGenerator } from "../../../utils"
import RouterLink from "../RouterLink"

interface IProps {
  pokemon?: Pokemon | any
}

const PokemonCard: React.FunctionComponent<IProps> = (props) => {
  const { pokemon } = props

  const name = get(pokemon, ["name"])
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get(
    pokemon,
    ["id"]
  )}.png`
  const pokemonID = pokemonIDGenerator(get(pokemon, ["id"]))
  const height = get(pokemon, ["height"]) / 10
  const weight = get(pokemon, ["weight"]) / 10
  const types = get(pokemon, ["types"])

  return (
    <Box margin={1} rounding={2} padding={2} borderStyle="sm">
      <RouterLink to={`/pokemon/${name}/`} hoverStyle="none">
        <Card image={<Avatar name={name} src={image} />}>
          <Box paddingX={3} paddingY={2}>
            <Text color="gray">#{pokemonID}</Text>

            <Heading size="md" truncate>
              {name}
            </Heading>
          </Box>

          <Box paddingX={3} paddingY={2}>
            <Text>height: {height} m</Text>

            <Text>weight: {weight} kg</Text>
          </Box>

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
                <span key={pokemonType} className={pokemonType}>
                  {pokemonType}
                </span>
              )
            })}
          </Box>
        </Card>
      </RouterLink>
    </Box>
  )
}

export default PokemonCard
