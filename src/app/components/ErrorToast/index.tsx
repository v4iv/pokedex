import React from "react"
import { Box, Layer, Toast } from "gestalt"

interface Props {
  message: string
}

const ErrorToast: React.FunctionComponent<Props> = (props) => {
  const { message } = props
  return (
    <Layer>
      <Box
        fit
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
        paddingX={1}
        position="fixed"
      >
        <Toast color="red" text={<>{message}</>} />
      </Box>
    </Layer>
  )
}

export default ErrorToast
