import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import common from './en/common.json'

export const defaultNS = 'common'

export const resources = {
  en: {common},
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['common'],
  defaultNS,
  resources,
})
