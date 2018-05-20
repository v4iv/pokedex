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
        this.handleSurprise = this.handleSurprise.bind(this);
    }

    handleInputChange(e) {
        e.preventDefault();
        this.query = e.target.value;
        console.log(this.query);
    }

    handleSearch() {
        let pokemon = this.query.toLowerCase();
        window.location = `/pokemon/${pokemon}/`;
    }

    handleSurprise() {
        window.location = `/pokemon/${Math.floor((Math.random() * 721) + 1)}/`;
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {

            // Get all "navbar-burger" elements
            var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach(function ($el) {
                    $el.addEventListener('click', function () {

                        // Get the target from the "data-target" attribute
                        var target = $el.dataset.target;
                        var $target = document.getElementById(target);

                        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
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
                        <a onClick={this.handleSurprise} className="navbar-item">Surprise Me</a>
                        <div className="navbar-item">
                            <form className="is-horizontal">
                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="input is-rounded is-danger"
                                               type="search"
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
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;