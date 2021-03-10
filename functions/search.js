const _ = require("lodash");
const pokedex = require("../search/search-index.json");

module.exports.handler = async (event, context, callback) => {
    const query = _.get(event, ["queryStringParameters", "q"]);

    const response = pokedex
        .filter(
            (pokemon) =>
                pokemon.name.toString().toLowerCase().includes(query.toLowerCase()) ||
                pokemon.id.toString().toLowerCase().includes(query.toLowerCase())
        )

    callback(null, {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
        },
        body: JSON.stringify(response),
    });
};
