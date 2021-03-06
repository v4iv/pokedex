import axios, { AxiosError, AxiosResponse } from "axios"
import { get } from "lodash"
import { Pokemon } from "../types/pokemon.types"

export const fetchPokemonAction: (p: string) => Promise<any> = (p) => {
  return new Promise((resolve, reject) => {
    const url = `${
      process.env.REACT_APP_BASE_URL
    }/pokemon/${p.toString().toLowerCase()}`

    axios
      .get(url)
      .then((response: AxiosResponse) => {
        const pokemon = get(response, ["data"])

        const speciesURL = get(pokemon, ["species", "url"])

        axios
          .get(speciesURL)
          .then((res: AxiosResponse) => {
            const species = get(res, ["data"])
            const evolutionChainURL = get(species, ["evolution_chain", "url"])

            axios
              .get(evolutionChainURL)
              .then((r: AxiosResponse) => {
                const evolutionChain = get(r, ["data"])

                const speciesData = {
                  ...species,
                  evolution_chain: evolutionChain,
                }

                const payload: Pokemon = { ...pokemon, species: speciesData }

                resolve(payload)
              })
              .catch((e: AxiosError) => {
                if (e.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(e.response.data)
                  console.log(e.response.status)
                  console.log(e.response.headers)
                } else if (e.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(e.request)
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", e.message)
                }
                console.log(e.config)

                reject(e)
              })
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
      .catch((error: AxiosError) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
        console.log(error.config)

        reject(error)
      })
  })
}
