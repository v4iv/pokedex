import React from "react"
import { Box, Heading } from "gestalt"

const PageNotFound: React.FunctionComponent = () => {
  return (
    <Box
      rounding={2}
      padding={12}
      margin={12}
      borderStyle="sm"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading size="lg" color="red">
        404
      </Heading>

      <Heading size="sm">Error: Page Not Found</Heading>
    </Box>
  )
}

export default PageNotFound
