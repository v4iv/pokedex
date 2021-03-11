import React from "react"
import { Box, Heading } from "gestalt"

const PageNotFound: React.FunctionComponent = () => {
  return (
    <Box
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading size="lg" color="red">
        404
      </Heading>

      <Heading size="sm">Error: Page Not Found</Heading>
    </Box>
  )
}

export default PageNotFound
