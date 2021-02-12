import React, { useState } from "react"
import { Link } from "react-router-dom"
import { capitalize, get, isEmpty } from "lodash"
import { fetchSearchResults, pokemonIDGenerator } from "../../../utils"

interface Result {
  name: string
  id: string
}

const SearchBox: React.FunctionComponent = () => {
  const [results, setResults] = useState([])
  const [active, setActive] = useState(false)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    if (query.length >= 2) {
      setActive(true)
      fetchSearchResults(query)
        .then((res: any) => {
          console.log("RESULTS: ", res)
          setResults(res)
        })
        .catch((err: any) => console.error(err))
    } else {
      setActive(false)
    }
  }

  return (
    <div className={`navbar-item ${active ? "is-active" : ""}`}>
      <input
        className="input"
        type="text"
        name="search"
        autoComplete="off"
        onChange={search}
        placeholder="Search"
      />

      <div className="navbar-dropdown">
        {active && !isEmpty(results)
          ? results.map((pokemon: Result) => {
              const pokemonID = pokemonIDGenerator(
                // eslint-disable-next-line radix
                parseInt(get(pokemon, ["id"]))
              )
              const slug = get(pokemon, ["name"])
              const pokemonName = capitalize(get(pokemon, ["name"]))

              return (
                <Link
                  key={pokemonID}
                  className="navbar-item is-danger"
                  to={`/pokemon/${slug}`}
                >
                  <small>{`#${pokemonID}`}</small>&nbsp;
                  <strong>{pokemonName}</strong>
                </Link>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default SearchBox
