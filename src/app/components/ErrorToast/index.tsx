import React, {useEffect, useState} from 'react'
import {Box, Layer, Toast} from 'gestalt'
import {useTranslation} from 'react-i18next'

interface Props {
  message: string
}

const ErrorToast: React.FunctionComponent<Props> = (props) => {
  const {message} = props
  const {t} = useTranslation(['common'])
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 3000)
  }, [setShow])

  return (
    <>
      {show && (
        <Layer>
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            paddingX={1}
            position="fixed"
          >
            <Toast
              variant="error"
              text={<>{t(`common:errors.${message}`)}</>}
            />
          </Box>
        </Layer>
      )}
    </>
  )
}

export default ErrorToast
