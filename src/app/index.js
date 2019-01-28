/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import Header from "./components/Header";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import configureStore from "./store";
import asyncComponent from "./components/AsyncComponent";

const AsyncHomePage = asyncComponent(() => import("./pages/HomePage"));
const AsyncPokemonPage = asyncComponent(() => import("./pages/PokemonPage"));


const App = () => {
    return (
        <Provider store={configureStore()}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <div>
                        <Switch>
                            <Route exact path='/' component={AsyncHomePage}/>
                            <Route exact path='/pokemon/:pokemon/' component={AsyncPokemonPage}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
};


export default App;
