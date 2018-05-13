/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from "../AsyncComponent";

const AsyncHomePage = asyncComponent(() => import('../../containers/PokemonListContainer'));


const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={AsyncHomePage}/>
            </Switch>
        </div>
    );
};

export default Main;