import {Handler} from '@netlify/functions'
import get from 'lodash/get'
import pokedex from '../search/search-index.json'

const handler: Handler = (event, context, callback) => {
  const query = get(event, ['queryStringParameters', 'q'])

  const res = pokedex.filter(
    (pokemon) =>
      pokemon.name.toString().toLowerCase().includes(query.toLowerCase()) ||
      pokemon.id.toString().toLowerCase().includes(query.toLowerCase()),
  )

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(res),
  })
}

export {handler}
