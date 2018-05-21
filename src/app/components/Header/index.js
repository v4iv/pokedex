/**
 * Created by vaibhav on 16/4/18
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.query = "";
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        Header.handleSurprise = Header.handleSurprise.bind(this);
    }

    handleInputChange(e) {
        e.preventDefault();
        this.query = e.target.value;
    }

    handleSearch() {
        let pokemon = this.query;
        if (pokemon.trim()) {
            window.location = `/pokemon/${pokemon.toLowerCase()}/`;
        }
    }

    static handleSurprise() {
        window.location = `/pokemon/${Math.floor((Math.random() * 721) + 1)}/`;
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
            if ($navbarBurgers.length > 0) {
                $navbarBurgers.forEach(function ($el) {
                    $el.addEventListener('click', function () {
                        let target = $el.dataset.target;
                        let $target = document.getElementById(target);
                        $el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                });
            }
        });
    }

    render() {
        return (
            <nav className="navbar is-transparent is-danger is-fixed-top">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <span className="pokeball"/>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/" className="navbar-item">
                        Pokédex
                    </Link>
                    <a className="navbar-burger burger has-text-white" aria-label="menu" data-target="navMenu">
                        <span/>
                        <span/>
                        <span/>
                    </a>
                </div>
                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-end">
                        <a onClick={Header.handleSurprise} className="navbar-item">Surprise Me</a>
                        <div className="navbar-item">
                            <div className="field has-addons">
                                <div className="control">
                                    <input className="input is-rounded is-danger"
                                           type="text"
                                           placeholder="Pokémon ID or Name"
                                           ref="searchInput"
                                           onChange={this.handleInputChange}/>
                                </div>
                                <div className="control">
                                    <a className="button is-danger is-rounded"
                                       onClick={this.handleSearch}
                                    >Search</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;