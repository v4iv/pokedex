import React, { createRef } from "react"
import { Box, Masonry, Spinner } from "gestalt"
import { Pokemon } from "../../types/pokemon.types"
import PokemonCard from "../PokemonCard"

interface IProps {
  pokemons: Pokemon[]
  loadItems: () => void
  loading: boolean
}

const PokemonGrid: React.FunctionComponent<IProps> = (props) => {
  const { pokemons, loadItems, loading } = props
  const scrollContainerRef = createRef<HTMLDivElement>()

  return (
    <>
      <Box maxHeight="80vh" ref={scrollContainerRef} overflow="auto">
        <Masonry
          minCols={2}
          comp={({ data }) => <PokemonCard pokemon={data} />}
          items={pokemons}
          loadItems={loadItems}
          scrollContainer={() => scrollContainerRef.current!}
          flexible
          virtualize
        />
        <Box paddingY={6}>
          <Spinner accessibilityLabel="Loading..." show={loading} />
        </Box>
      </Box>
    </>
  )
}

export default PokemonGrid
