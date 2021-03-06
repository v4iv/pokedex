import React from "react"
import { ProviderProps } from "gestalt"

interface ContextProp {
  theme: ProviderProps["colorScheme"]
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ContextProp>({
  theme: "light",
  toggleTheme: () => {},
})

export default ThemeContext
