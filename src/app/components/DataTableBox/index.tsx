import React from "react"
import { Badge, Box, Table, Text } from "gestalt"
import get from "lodash/get"
import upperCase from "lodash/upperCase"

interface IProps {
  height: number
  weight: number
  abilities: Object[]
  shape: string
}

const DataTableBox: React.FunctionComponent<IProps> = (props) => {
  const { height, weight, abilities, shape } = props

  return (
    <Box margin={1} rounding={2} borderStyle="sm" paddingX={3} paddingY={5}>
      <Table accessibilityLabel="Pokemon Data">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                Abilities
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">
                {abilities.map((ability) => {
                  const abilityName = upperCase(
                    get(ability, ["ability", "name"])
                  )
                  return (
                    <Badge
                      key={abilityName}
                      text={`${abilityName}`}
                      position="middle"
                    />
                  )
                })}
              </Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                Height
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">{height} m</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                Weight
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">{weight} Kg</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                Shape
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">{shape}</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  )
}

export default DataTableBox
