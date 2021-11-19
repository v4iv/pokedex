import React, { useEffect, useState } from "react";
import { Box, Layer, Toast } from "gestalt";

interface Props {
  message: string;
}

const ErrorToast: React.FunctionComponent<Props> = (props) => {
  const [show, setShow] = useState(true);
  const { message } = props;

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [setShow]);

  return (
    <>
      {show && (
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
            <Toast variant="error" text={<>{message}</>} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ErrorToast;
