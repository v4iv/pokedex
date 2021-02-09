import React, { lazy, Suspense } from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import store from "./store"
import Header from "./components/Header"
import Spinner from "./components/Spinner"
// Pages
const HomePage = lazy(() => import("./pages/HomePage"))
const PokemonPage = lazy(() => import("./pages/PokemonPage"))

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <Header />
          <div className="container">
            <Suspense
              fallback={
                <section className="section is-large">
                  <Spinner />
                </section>
              }
            >
              <Switch>
                <Route component={HomePage} exact path="/" />
                <Route component={PokemonPage} exact path="/pokemon/:slug" />
              </Switch>
            </Suspense>
          </div>
        </>
      </BrowserRouter>
    </Provider>
  )
}

export default App
