import React from "react"
import { Box, Table, Text } from "gestalt"

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
      <Table>
        <Table.Body>
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
