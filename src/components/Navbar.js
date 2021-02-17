import React, { Component } from "react";
import './Navbar.css'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {getCurrentUser} from '../store/actions/authActions'


class Navbar extends Component{

    constructor(props)
    {
        super(props);    
    }

    render()
    {
        if(this.props.currentUser == null)
        {
            return (
                <div className = "Home">
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                            <div className="container">
                            <Link to="/" style={{ textDecoration: 'none' , color:'black'}}>
                                <a className="navbar-brand" href="#">Food Guru</a>
                            </Link>
                                <ul className="navbar-nav ml-auto">
                                <Link to="/register" style={{ textDecoration: 'none' , color:'black'}}> 
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Sign Up</a>
                                    </li>
                                </Link>
                                <Link to="/login" style={{ textDecoration: 'none' , color:'black'}}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Log In</a>
                                    </li>
                                </Link>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            );
        }

        else
        {
            return (
                <div className = "Home">
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                            <div className="container">
                            <Link to="/" style={{ textDecoration: 'none' , color:'black'}}>
                                <a className="navbar-brand" href="#">Food Guru</a>
                            </Link>
                                <ul className="navbar-nav ml-auto">
                                <Link to="/profile" style={{ textDecoration: 'none' , color:'black'}}> 
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Profile</a>
                                    </li>
                                </Link>
                                <Link to="/signout" style={{ textDecoration: 'none' , color:'black'}}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Logout</a>
                                    </li>
                                </Link>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            );
        }
        
    }
};



export default Navbar;