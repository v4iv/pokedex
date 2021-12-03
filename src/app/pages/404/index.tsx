import React from 'react'
import {Box, Heading} from 'gestalt'
import {useTranslation} from 'react-i18next'

const PageNotFound: React.FunctionComponent = () => {
  const {t} = useTranslation(['common'])

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

      <Heading size="sm">{t('common:errors.page-not-found')}</Heading>
    </Box>
  )
}

export default PageNotFound
