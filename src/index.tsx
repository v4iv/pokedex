import React from "react"
import ReactDOM from "react-dom"
import TagManager from "react-gtm-module"
import "gestalt/dist/gestalt.css"
import "./assets/css/styles.css"
import App from "./app"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration"
import reportWebVitals from "./reportWebVitals"
import { sendToAnalytics } from "./utils"

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID || "",
  events: {
    CLS: "CLS",
    FCP: "FCP",
    LCP: "LCP",
    FID: "FID",
    TTFB: "TTFB",
  },
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToAnalytics)
