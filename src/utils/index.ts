import TagManager from 'react-gtm-module'

// Pokemon ID Generator
export const pokemonIDGenerator = (id: number) => {
  const idString = `${id}`

  const filler = '000'

  return filler.substring(0, filler.length - idString.length) + idString
}

// Web Vitals Reporting
export const sendToAnalytics = (metrics: any) => {
  const {id, delta, name, value} = metrics
  if (typeof window !== 'undefined') {
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

// Handle HTTP Errors
export const handleErrors = (err: any) => {
  let errorMessage = {}

  if (err.response) {
    // The request was made and the server responded with a status code
    if (err.response.status === 400) {
      errorMessage = {
        message: 'bad-request',
        status: 400,
      }
    } else if (err.response.status === 401) {
      errorMessage = {
        message: 'unauthorized',
        status: 401,
      }
    } else if (err.response.status === 403) {
      errorMessage = {
        message: 'forbidden',
        status: 403,
      }
    } else if (err.response.status === 404) {
      errorMessage = {
        message: 'not-found',
        status: 404,
      }
    } else if (err.response.status === 405) {
      errorMessage = {
        message: 'method-not-allowed',
        status: 405,
      }
    } else if (err.response.status === 500) {
      errorMessage = {
        message: 'internal-server-error',
        status: 500,
      }
    } else {
      errorMessage = {
        message: 'something-went-wrong',
        status: 500,
      }
    }
  } else {
    errorMessage = {
      message: 'something-went-wrong',
      status: 500,
    }
  }

  return errorMessage
}
