import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./styles.css"
import SearchBox from "../SearchBox"

const Header: React.FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
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
            <SearchBox />
            <a
              className="navbar-item is-pulled-right"
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
