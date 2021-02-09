import React from "react"
import "./styles.css"

const Spinner: React.FunctionComponent = () => {
  return (
    <section className="section">
      <nav className="level">
        <div className="level-item has-text-centered">
          <div id="loading">
            <div className="pokeball-spinner" id="normal" />
            <div className="pokeball-spinner" id="great" />
            <div className="pokeball-spinner" id="ultra" />
            <div className="pokeball-spinner" id="master" />
            <div className="pokeball-spinner" id="safari" />
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Spinner
