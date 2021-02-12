import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { kebabCase } from "lodash"
import "./styles.css"

const Header: React.FunctionComponent = () => {
  const history = useHistory()

  const [menuOpen, setMenuOpen] = useState(false)
  const [input, setInput] = useState("")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target
    setInput(value)
  }

  const handleSearch = () => {
    const query = input.toString().trim().toLowerCase()

    history.push(`/pokemon/${kebabCase(query)}`)

    toggleMenu()

    setInput("")
  }

  return (
    <nav className="navbar is-transparent is-danger is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <span className="pokeball" />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/" className="navbar-item">
            POKéDEX
          </Link>
          <a
            role="button"
            className={`navbar-burger ${menuOpen ? "is-active" : ""}`}
            aria-label="menu"
            data-target="navMenu"
            onClick={toggleMenu}
            onKeyDown={toggleMenu}
            tabIndex={0}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${menuOpen ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    className="input is-danger"
                    type="text"
                    placeholder="Pokémon ID or Name"
                    value={input}
                    onChange={handleChange}
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-danger"
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <a
              className="navbar-item"
              href="https://github.com/v4iv/pokedex"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
