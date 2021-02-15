import React from "react"
import {
  Avatar,
  Box,
  Column,
  SegmentedControl,
  SegmentedControlProps,
} from "gestalt"

interface IProps {
  id: string | number
  name: string
}

const SpriteBox: React.FunctionComponent<IProps> = (props) => {
  const { id, name } = props
  const [itemIndex, setItemIndex] = React.useState(0)

  const normaSpriteFront = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const normaSpriteBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
  const shinySpriteFront = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
  const shinySpriteBack = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`

  const segmentedControlProps: SegmentedControlProps = {
    items: ["Normal", "Shiny"],
    selectedItemIndex: itemIndex,
    onChange: ({ activeIndex }) => setItemIndex(activeIndex),
  }

  const renderSprite = () => {
    switch (itemIndex) {
      case 0:
        return (
          <Box padding={3} display="flex" justifyContent="around">
            <Column span={4}>
              <Avatar name={name} src={normaSpriteFront} size="fit" />
            </Column>
            <Column span={4}>
              <Avatar name={name} src={normaSpriteBack} size="fit" />
            </Column>
          </Box>
        )
      case 1:
        return (
          <Box padding={3} display="flex" justifyContent="around">
            <Column span={4}>
              <Avatar name={name} src={shinySpriteFront} size="fit" />
            </Column>
            <Column span={4}>
              <Avatar name={name} src={shinySpriteBack} size="fit" />
            </Column>
          </Box>
        )
      default:
        return (
          <Box padding={3} display="flex" justifyContent="around">
            <Column span={4}>
              <Avatar name={name} src={normaSpriteFront} size="fit" />
            </Column>
            <Column span={4}>
              <Avatar name={name} src={normaSpriteBack} size="fit" />
            </Column>
          </Box>
        )
    }
  }

  return (
    <Box margin={1} padding={2} rounding={2} borderStyle="sm">
      {renderSprite()}
      <SegmentedControl {...segmentedControlProps} />
    </Box>
  )
}

export default SpriteBox
