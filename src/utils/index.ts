import React from "react"
import axios from "axios"
import { ProviderProps } from "gestalt"

interface ContextProp {
  theme: ProviderProps["colorScheme"]
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ContextProp>({
  theme: "light",
  toggleTheme: () => {},
})

// Search
export const fetchSearchResults = (query: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/search?q=${query}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.data))
  })
}

// Pokemon ID Generator
export const pokemonIDGenerator = (id: number) => {
  const idString = `${id}`

  const filler = "000"

  return filler.substring(0, filler.length - idString.length) + idString
}

// Web Vitals Reporting
export const sendToAnalytics = (metrics: any) => {
  const { id, delta, name, value } = metrics
  if (typeof window !== "undefined" && typeof gtag !== "undefined") {
    gtag("event", name, {
      // Use the metric delta as the event's value parameter.
      value: delta,
      // Everything below is a custom event parameter.
      web_vitals_metric_id: id, // Needed to aggregate events.
      web_vitals_metric_name: name, // Needed to aggregate events.
      web_vitals_metric_value: value, // Optional
      // Any additional params or metadata (e.g. debug information) can be
      // set here as well, within the following limitations:
      // https://support.google.com/analytics/answer/9267744
    })
  }
}
