import axios, { AxiosResponse } from "axios"
import { get } from "lodash"
import { Pokemon } from "../types/pokemon.types"

export const fetchPokedex: Function = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse = await axios({
        method: "get",
        url,
      })

      const data: Pokemon[] = []

      // eslint-disable-next-line no-restricted-syntax
      for (const pokemon of response.data.results) {
        try {
          const res: AxiosResponse = await axios({
            method: "get",
            url: get(pokemon, ["url"]),
          })

          const p: Pokemon = get(res, ["data"])

          data.push(p)
        } catch (err) {
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
        }
      }

      resolve({
        data,
        next: get(response, ["data", "next"]),
      })
    } catch (err) {
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
    }
  })
}

export const sortPokemons = (
  list: Pokemon[],
  order_by = "Lowest Number First"
) => {
  return list.sort((param1, param2) => {
    switch (order_by) {
      case "Lowest Number First":
        return param1.id - param2.id

      case "Highest Number First":
        return param2.id - param1.id

      case "Z - A":
        return param2.name.localeCompare(param1.name)

      case "A - Z":
        return param1.name.localeCompare(param2.name)

      default:
        return param1.id - param2.id
    }
  })
}
