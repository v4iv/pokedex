import React from "react"
import { Box, Text } from "gestalt"

interface IProps {
  flavorText: string
}

const FlavorTextBox: React.FunctionComponent<IProps> = (props) => {
  const { flavorText } = props

  return (
    <>
      <Box margin={1} rounding={2} borderStyle="sm" paddingX={5} paddingY={7}>
        <Text weight="bold">{flavorText}</Text>
      </Box>
    </>
  )
}

export default FlavorTextBox
