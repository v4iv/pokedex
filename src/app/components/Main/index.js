/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from '../AsyncComponent';

const AsyncHomePage = asyncComponent(() => import("../../pages/HomePage"));
const AsyncPokemonPage = asyncComponent(() => import("../../pages/PokemonPage"));

const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={AsyncHomePage}/>
                <Route exact path='/pokemon/:pokemon/' component={AsyncPokemonPage}/>
            </Switch>
        </div>
    );
};

export default Main;