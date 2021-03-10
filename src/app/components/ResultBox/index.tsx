import React from "react"
import { capitalize, get } from "lodash"
import { Avatar, Box, Spinner, Text } from "gestalt"
import { ISearchResult } from "../../types/pokedex.types"
import { pokemonIDGenerator } from "../../../utils"
import RouterLink from "../RouterLink"

interface IProps {
  results: ISearchResult[]
  searching: boolean
}

const ResultBox: React.FunctionComponent<IProps> = (props) => {
  const { results, searching } = props

  return (
    <Box padding={3} column={12}>
      {results.length ? (
        <>
          {results.map((pokemon: any) => {
            const pokemonID = pokemonIDGenerator(get(pokemon, ["id"]))
            const pokemonName = get(pokemon, ["name"])
            return (
              <Box
                key={pokemonID}
                borderStyle="sm"
                rounding={2}
                margin={1}
                flex="grow"
              >
                <RouterLink to={`/pokemon/${pokemonName}/`} hoverStyle="none">
                  <Box padding={2} alignItems="center" display="flex">
                    <Box paddingX={2}>
                      <Avatar
                        name={pokemonName}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        size="xs"
                      />
                    </Box>
                    <Box paddingX={2} flex="grow">
                      <Text color="darkGray" weight="bold">
                        {capitalize(pokemonName)}
                      </Text>
                      <Text size="sm" color="gray">
                        {`#${pokemonID}`}
                      </Text>
                    </Box>
                  </Box>
                </RouterLink>
              </Box>
            )
          })}
        </>
      ) : (
        <Text>Sorry, No Records Found!</Text>
      )}
      <Spinner accessibilityLabel="Loading..." show={searching} />
    </Box>
  )
}

export default ResultBox
