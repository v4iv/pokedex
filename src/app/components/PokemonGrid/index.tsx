import React from "react"
import { Box } from "gestalt"
import { Pokemon } from "../../types/pokemon.types"
import PokemonCard from "../PokemonCard"

interface IProps {
  pokemons: Pokemon[]
}

const PokemonGrid: React.FunctionComponent<IProps> = (props) => {
  const { pokemons } = props

  return (
    <>
      <Box
        display="flex"
        direction="row"
        justifyContent="between"
        wrap
        paddingX={2}
        paddingY={3}
      >
        {pokemons.map((pokemon, idx) => {
          return <PokemonCard key={idx} pokemon={pokemon} />
        })}
      </Box>
    </>
  )
}

export default PokemonGrid
