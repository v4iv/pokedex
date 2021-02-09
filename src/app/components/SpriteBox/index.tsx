import React from "react"
import { get } from "lodash"
import "./styles.css"

interface Props {
  name: string
  sprites: object
  types: object[]
}

const SpriteBox: React.FunctionComponent<Props> = (props) => {
  const { name, sprites, types } = props

  const frontDefaultSprite: string = get(sprites, ["front_default"])
  const backDefaultSprite: string = get(sprites, ["back_default"])

  return (
    <div className="card">
      <div className="card-image">
        <div className="animation">
          <div className="animation-frames">
            <div className="animation-frame">
              <figure className="image is-2by2 has-background-light">
                <img src={frontDefaultSprite} alt={name} />
              </figure>
            </div>
            <div className="animation-frame">
              <figure className="image is-2by2 has-background-light">
                <img src={backDefaultSprite} alt={name} />
              </figure>
            </div>
          </div>
        </div>
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

export default SpriteBox
