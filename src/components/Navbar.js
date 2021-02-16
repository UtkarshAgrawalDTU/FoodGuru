import React, { Component } from "react";
import './Navbar.css'

class Navbar extends Component{

    render()
    {
        return (
            <div className = "Home">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                        <div className="container">
                            <a className="navbar-brand" href="#">Food Guru</a>
                            <ul className="navbar-nav ml-auto"> 
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Log In</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
};

export default Navbar;