import React from "react"
import { Masonry } from "gestalt"
import { Pokemon } from "../../types/pokemon.types"
import PokemonCard from "../PokemonCard"

interface IProps {
  pokemons: Pokemon[]
  loadItems: () => {}
}

const PokemonGrid: React.FunctionComponent<IProps> = (props) => {
  const { pokemons, loadItems } = props

  return (
    <>
      <Masonry
        minCols={1}
        comp={({ data }) => <PokemonCard pokemon={data} />}
        items={pokemons}
        loadItems={loadItems}
        flexible
        virtualize
      />
    </>
  )
}

export default PokemonGrid
