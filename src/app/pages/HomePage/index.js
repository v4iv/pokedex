/**
 * Created by vaibhav on 14/5/18
 */
import React from 'react';
import PokemonListContainer from '../../containers/PokemonListContainer';


const HomePage = () => {
    return(
        <section className="section">
            <PokemonListContainer/>
        </section>
    );
};

export default HomePage;