/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";

const Header = () => {
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
            </div>
        </nav>
    );
};

export default Header;