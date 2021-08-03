import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return(
        <div>
            <nav className='nav'>
                <ul className='ul'>
                    <li className='li'><a className='a' href="/">Home</a></li>
                    <li className='li'><a className='a' href="/dashboard">Dashboard</a></li>
                    <li className='li'><a className='a' href="#">Members</a></li>
                    <li className='li'><a className='a' href="/signUp">Sign-Up</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;