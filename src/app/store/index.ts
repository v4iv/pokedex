import { compose, createStore } from "redux"
import rootReducer from "../reducers"

const composeEnhancers =
  ((window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: true,
      trace: true,
    })) as typeof compose) || compose

const store = createStore(rootReducer, composeEnhancers())

export default store
