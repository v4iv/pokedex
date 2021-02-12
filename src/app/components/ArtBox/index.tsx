import React from "react"
import { get } from "lodash"

interface Props {
  name: string
  image: string
  types: object[]
}

const ArtBox: React.FunctionComponent<Props> = (props) => {
  const { name, image, types } = props

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-2by2 has-background-light">
          <img src={image} alt={name} />
        </figure>
      </div>

      <footer className="card-footer">
        {types.map((item: object, idx: number) => {
          const pokemonType = get(item, ["type", "name"])

          return (
            <span
              key={idx}
              className={`card-footer-item is-uppercase ${pokemonType}`}
            >
              {pokemonType}
            </span>
          )
        })}
      </footer>
    </div>
  )
}

export default ArtBox
