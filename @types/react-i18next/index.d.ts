import 'react-i18next'
import {resources, defaultNS} from '../../src/i18n/config'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['en']
  }
}
