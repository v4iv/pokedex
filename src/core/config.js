/**
 * Created by vaibhav on 16/4/18
 */
const Pokedex = require('pokeapi-js-wrapper');
const options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 60 * 1000 // 60s
};
export const PokeAPI = new Pokedex.Pokedex(options);