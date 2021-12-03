import React from 'react'
import {Badge, Box, Table, Text} from 'gestalt'
import get from 'lodash/get'
import upperCase from 'lodash/upperCase'
import {useTranslation} from 'react-i18next'

interface IProps {
  height: number
  weight: number
  abilities: Object[]
  shape: string
}

const DataTableBox: React.FC<IProps> = (props) => {
  const {height, weight, abilities, shape} = props
  const {t} = useTranslation(['common'])

  return (
    <Box margin={1} rounding={2} borderStyle="sm" paddingX={3} paddingY={5}>
      <Table accessibilityLabel={t('common:pokemon-data')}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                {t('common:abilities')}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">
                {abilities.map((ability) => {
                  const abilityName = upperCase(
                    get(ability, ['ability', 'name']),
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
                {t('common:height')}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">{height} m</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                {t('common:weight')}
              </Text>
            </Table.Cell>
            <Table.Cell>
              <Text align="center">{weight} Kg</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Text weight="bold" align="center">
                {t('common:shape')}
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
