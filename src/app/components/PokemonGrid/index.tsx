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
  // @ts-ignore
  const measurementStore = Masonry.createMeasurementStore(pokemons.length)

  return (
    <>
      <Box maxHeight="80vh" ref={scrollContainerRef} overflow="auto">
        <Masonry
          minCols={2}
          comp={({ data }) => <PokemonCard pokemon={data} />}
          items={pokemons}
          loadItems={loadItems}
          scrollContainer={() => scrollContainerRef.current!}
          measurementStore={measurementStore}
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
