import axios, { AxiosError, AxiosResponse } from "axios"
import { get } from "lodash"
import { Pokemon } from "../types/pokemon.types"

interface Payload {
  data: Pokemon[]
  url: string
}

export const fetchPokemons: (url: string) => Promise<any> = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        const results = get(response, ["data", "results"])
        const nextURL = get(response, ["data", "next"])

        const requests = results.map((pokemon: Pokemon) => {
          const pokemonURL = get(pokemon, ["url"])

          return axios.get(pokemonURL)
        })

        Promise.all<AxiosResponse>(requests)
          .then((res) => {
            const pokemonList = res.map((r) => get(r, ["data"]))

            const payload: Payload = {
              data: pokemonList,
              url: nextURL,
            }

            resolve(payload)
          })
          .catch((err) => reject(err))
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(err.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message)
        }
        console.log(err.config)

        reject(err)
      })
  })
}

export const sortPokemons: (list: Pokemon[], order_by: string) => Pokemon[] = (
  list,
  order_by = "Lowest Number First"
) => {
  return list.sort((param1, param2) => {
    switch (order_by) {
      case "lowest_number_first":
        return param1.id - param2.id

      case "highest_number_first":
        return param2.id - param1.id

      case "z_a":
        return param2.name.localeCompare(param1.name)

      case "a_z":
        return param1.name.localeCompare(param2.name)

      default:
        return param1.id - param2.id
    }
  })
}
