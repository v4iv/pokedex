const DEFAULT_DURATION = 600000; // 10 Minutes

// export const sendToGoogleAnalytics = ({name, delta, value, id}) => {
//     // Assumes the global `gtag()` function exists, see:
//     // https://developers.google.com/analytics/devguides/collection/ga4
//     window && window.gtag('event', name, {
//         // Use the metric delta as the event's value parameter.
//         value: delta,
//         // Everything below is a custom event parameter.
//         web_vitals_metric_id: id, // Needed to aggregate events.
//         web_vitals_metric_value: value, // Optional
//         // Any additional params or metadata (e.g. debug information) can be
//         // set here as well, within the following limitations:
//         // https://support.google.com/analytics/answer/9267744
//     });
// }

// export const sendToAnalytics = ({ id, name, value }) => {
//     window && window.ga('send', 'event', {
//         eventCategory: 'Web Vitals',
//         eventAction: name,
//         eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
//         eventLabel: id, // id unique to current page load
//         nonInteraction: true, // avoids affecting bounce rate
//     });
// }

// Pokemon ID Generator
export const pokemonIDGenerator = (id: number) => {
  const idString = `${id}`;

  const filler = "000";

  return filler.substring(0, filler.length - idString.length) + idString;
};

// Memoization
export const isCached = (key: string) => {
  if (localStorage && localStorage.getItem(key)) {
    console.log("Checking Cache ...");

    const value: string | null = localStorage.getItem(key);

    if (typeof value === "string") {
      const data: any = JSON.parse(value);

      const cachedUntil: any = data.expiry;

      const currentTime: any = Date.now();

      // noinspection PointlessBooleanExpressionJS,UnnecessaryLocalVariableJS
      const cached = !!(cachedUntil > currentTime);

      return cached;
    }
  }
};

export const getCached = (key: string) => {
  if (localStorage && localStorage.getItem(key)) {
    console.log("Getting Cache ...");

    const value: string | null = localStorage.getItem(key);

    // noinspection UnnecessaryLocalVariableJS
    if (typeof value === "string") {
      return JSON.parse(value);
    }
  }
};

export const setCache = (
  key: string,
  data: any,
  duration: number = DEFAULT_DURATION
) => {
  if (localStorage) {
    console.log("Setting Cache ...");

    const cacheUntil = Date.now() + duration;

    const value = {
      data,
      expiry: cacheUntil,
    };

    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const clearCache = (key: string) => {
  console.log("Clearing %s Cache ...", key);
  if (localStorage && localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
