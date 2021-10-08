import React from 'react';
import { Link } from 'react-router-dom';
import navLogo from '../../../images/logos/logo.png';
import './Navbar.css';
const Navbar = () => {
    return(
        <div className="header-bg">
            <nav class="navbar navbar-expand-lg navbar-light container">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">
                        <img src={navLogo} style={{width: '150px'}} alt="" />
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse link" id="navbarNav">
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item">
                                <Link class="nav-link nav-link-border active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link nav-link-border" to="/dashboard">Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link nav-link-border" to="#">Our-Teams</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link login btn" style={{color: "#fff", padding: '10px 30px'}} to="/signUp">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;