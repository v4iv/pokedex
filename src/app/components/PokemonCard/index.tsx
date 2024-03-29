import React from 'react'
import get from 'lodash/get'
import capitalize from 'lodash/capitalize'
import {Avatar, Box, Card, Heading, Text} from 'gestalt'
import {Pokemon} from '../../types/pokemon.types'
import {pokemonIDGenerator} from '../../../utils'
import RouterLink from '../RouterLink'
import {useTranslation} from 'react-i18next'

interface IProps {
  pokemon?: Pokemon | any
}

const PokemonCard: React.FC<IProps> = (props) => {
  const {pokemon} = props
  const {t} = useTranslation(['common'])

  const name = get(pokemon, ['name'])
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${get(
    pokemon,
    ['id'],
  )}.png`
  const pokemonID = pokemonIDGenerator(get(pokemon, ['id']))
  const height = get(pokemon, ['height']) / 10
  const weight = get(pokemon, ['weight']) / 10
  const types = get(pokemon, ['types'])

  return (
    <Box margin={1} rounding={2} padding={2} borderStyle="sm">
      <RouterLink to={`/pokemon/${name}/`} hoverStyle="none">
        <Card image={<Avatar name={name} src={image} />}>
          <Box paddingX={3} paddingY={2}>
            <Text color="gray">#{pokemonID}</Text>

            <Heading size="md" truncate>
              {capitalize(name)}
            </Heading>
          </Box>

          <Box paddingX={3} paddingY={2}>
            <Text lineClamp={1}>
              {t('common:height')}: {height} m
            </Text>

            <Text lineClamp={1}>
              {t('common:weight')}: {weight} kg
            </Text>
          </Box>

          <Box
            paddingX={3}
            paddingY={2}
            display="flex"
            justifyContent="around"
            alignItems="center"
          >
            {types.map((item: object) => {
              const pokemonType = get(item, ['type', 'name'])

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
