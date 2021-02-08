import React, {Fragment, FunctionComponent} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import store from "./store";
import Header from "./components/Header";
// Pages
import HomePage from "./pages/HomePage";

const App: FunctionComponent = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <Fragment>
                <Header/>
                <div className='container'>
                    <Switch>
                        <Route component={HomePage} exact path={`/`}/>
                    </Switch>
                </div>
            </Fragment>
        </BrowserRouter>
    </Provider>
};

export default App;
