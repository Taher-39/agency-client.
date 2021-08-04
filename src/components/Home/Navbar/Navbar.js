import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
    return(
        <div>
            <nav className='nav'>
                <ul className='ul'>
                    <li className='li'><Link className='a' to="/">Home</Link></li>
                    <li className='li'><Link className='a' to="/dashboard">Dashboard</Link></li>
                    <li className='li'><Link className='a' to="#">Members</Link></li>
                    <li className='li'><Link className='a' to="/signUp">Sign-Up</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;