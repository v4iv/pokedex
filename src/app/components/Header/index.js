/**
 * Created by vaibhav on 16/4/18
 */
import React from 'react';

const Header = () => {
    return (
        <nav className="navbar is-transparent is-danger is-fixed-top">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <span className="pokeball"/>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="navbar-item">
                    Pokédex
                </div>
            </div>
        </nav>
    );
};

export default Header;