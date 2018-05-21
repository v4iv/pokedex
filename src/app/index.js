/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import Header from "./components/Header";
import {Route, Switch} from 'react-router-dom';
import asyncComponent from "./components/AsyncComponent";

const AsyncHomePage = asyncComponent(() => import("./pages/HomePage"));
const AsyncPokemonPage = asyncComponent(() => import("./pages/PokemonPage"));

const App = () => {
    return (
        <div>
            <Header/>
            <div>
                <Switch>
                    <Route exact path='/' component={AsyncHomePage}/>
                    <Route exact path='/pokemon/:pokemon/' component={AsyncPokemonPage}/>
                </Switch>
            </div>
        </div>
    );
};


export default App;