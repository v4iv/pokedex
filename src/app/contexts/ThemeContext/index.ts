import React from 'react'
import {ColorSchemeProviderProps} from 'gestalt'

interface ContextProp {
  theme: ColorSchemeProviderProps['colorScheme']
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ContextProp>({
  theme: 'light',
  toggleTheme: () => {},
})

export default ThemeContext
