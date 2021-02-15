import React from "react"
import { get, capitalize, isEmpty } from "lodash"
import { Avatar, Box, Column, Pog, Text } from "gestalt"
import RouterLink from "../RouterLink"

interface IProps {
  evolutionChain: Object
}

const EvolutionBox: React.FunctionComponent<IProps> = (props) => {
  const { evolutionChain } = props

  const species = get(evolutionChain, ["chain", "species", "name"])

  const evolvesToList = get(evolutionChain, ["chain", "evolves_to"], [])

  const evolvesToEvolvesToList = evolvesToList.map((evolutions: any) =>
    get(evolutions, ["evolves_to"])
  )

  return (
    <Box margin={1} rounding={2} borderStyle="sm">
      <Box padding={3}>
        <Text weight="bold">Evolution Chain</Text>
      </Box>
      <Box
        display="flex"
        direction="row"
        paddingX={1}
        paddingY={2}
        justifyContent="around"
        alignItems="center"
      >
        <Column span={4}>
          <RouterLink
            to={`/pokemon/${species}/`}
            hoverStyle="none"
            accessibilityLabel={species}
          >
            <Box
              margin={1}
              rounding={2}
              borderStyle="sm"
              display="flex"
              alignItems="center"
            >
              <Box padding={2}>
                <Avatar name={species} size="sm" />
              </Box>
              <Box flex="grow" padding={2}>
                <Text truncate>{capitalize(species)}</Text>
              </Box>
            </Box>
          </RouterLink>
        </Column>
        {!isEmpty(evolvesToList) && (
          <Column span={4}>
            {evolvesToList.map((evolution: any) => {
              const evolutionName = get(evolution, ["species", "name"])
              return (
                <RouterLink
                  key={evolutionName}
                  to={`/pokemon/${evolutionName}/`}
                  hoverStyle="none"
                  accessibilityLabel={evolutionName}
                >
                  <Box
                    margin={1}
                    key={evolutionName}
                    rounding={2}
                    borderStyle="sm"
                    display="flex"
                    alignItems="center"
                  >
                    <Box padding={2}>
                      <Avatar name={evolutionName} size="sm" />
                    </Box>
                    <Box flex="grow" padding={2}>
                      <Text truncate>{capitalize(evolutionName)}</Text>
                    </Box>
                  </Box>
                </RouterLink>
              )
            })}
          </Column>
        )}
        {!isEmpty(evolvesToEvolvesToList[0]) && (
          <Column span={4}>
            {evolvesToEvolvesToList.map((evolutions: any) => {
              return evolutions.map((evolution: any) => {
                const evolutionName = get(evolution, ["species", "name"])
                return (
                  <RouterLink
                    key={evolutionName}
                    to={`/pokemon/${evolutionName}/`}
                    hoverStyle="none"
                    accessibilityLabel={evolutionName}
                  >
                    <Box
                      margin={1}
                      rounding={2}
                      borderStyle="sm"
                      display="flex"
                      alignItems="center"
                    >
                      <Box padding={2}>
                        <Avatar name={evolutionName} size="sm" />
                      </Box>
                      <Box flex="grow" padding={2}>
                        <Text truncate>{capitalize(evolutionName)}</Text>
                      </Box>
                    </Box>
                  </RouterLink>
                )
              })
            })}
          </Column>
        )}
      </Box>
    </Box>
  )
}

export default EvolutionBox
