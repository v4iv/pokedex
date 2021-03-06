import TagManager from "react-gtm-module"

// Pokemon ID Generator
export const pokemonIDGenerator = (id: number) => {
  const idString = `${id}`

  const filler = "000"

  return filler.substring(0, filler.length - idString.length) + idString
}

// Web Vitals Reporting
export const sendToAnalytics = (metrics: any) => {
  const { id, delta, name, value } = metrics
  if (typeof window !== "undefined") {
    TagManager.dataLayer({
      dataLayer: {
        event: name,
        // Use the metric delta as the event's value parameter.
        value: delta,
        // Everything below is a custom event parameter.
        web_vitals_metric_id: id, // Needed to aggregate events.
        web_vitals_metric_name: name, // Needed to aggregate events.
        web_vitals_metric_value: value, // Optional
      },
    })
  }
}
