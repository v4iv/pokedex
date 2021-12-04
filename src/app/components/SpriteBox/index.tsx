import React from 'react'
import {
  Avatar,
  Box,
  Column,
  SegmentedControl,
  SegmentedControlProps,
} from 'gestalt'

interface IProps {
  id: string | number
  name: string
}

const SpriteBox: React.FunctionComponent<IProps> = (props) => {
  const {id, name} = props
  const [itemIndex, setItemIndex] = React.useState(0)

  const normaSpriteFront = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const normaSpriteBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
  const shinySpriteFront = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
  const shinySpriteBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`

  const segmentedControlProps: SegmentedControlProps = {
    items: ['Normal', 'Shiny'],
    selectedItemIndex: itemIndex,
    onChange: ({activeIndex}) => setItemIndex(activeIndex),
  }

  return (
    <Box margin={1} padding={2} rounding={2} borderStyle="sm">
      {itemIndex === 0 ? (
        <Box padding={3} display="flex" justifyContent="around">
          <Column span={4}>
            <Avatar name={`${name}-normal-front`} src={normaSpriteFront} />
          </Column>
          <Column span={4}>
            <Avatar name={`${name}-normal-back`} src={normaSpriteBack} />
          </Column>
        </Box>
      ) : (
        <Box padding={3} display="flex" justifyContent="around">
          <Column span={4}>
            <Avatar name={`${name}-shiny-front`} src={shinySpriteFront} />
          </Column>
          <Column span={4}>
            <Avatar name={`${name}-shiny-back`} src={shinySpriteBack} />
          </Column>
        </Box>
      )}
      <SegmentedControl {...segmentedControlProps} />
    </Box>
  )
}

export default SpriteBox
