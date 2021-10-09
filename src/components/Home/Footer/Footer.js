import React from 'react';
import navLogo from '../../../images/logos/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer pt-5 mt-5'>
            <div className="container footer-content py-5">
                <div className="row">
                    <div className='col-sm-4'>
                        <h1 className='text-2xl font-normal pb-3'>Quick Links</h1>
                        <ul className='text-gray-400 '>
                            <li >
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>About</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Advertise</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Cooking Policy</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Terms and Conditions</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <h1 className='text-2xl font-normal pb-3'>Service Category</h1>
                        <ul className='text-gray-400'>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Web Development</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Graphics Design</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Video Editing</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>App Develop</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Thumbnail Making</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='col-sm-4'>
                        <h1 className='text-2xl font-normal pb-3'>Contact Us</h1>
                        <ul className='text-gray-400'>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Submit a News Tip</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Member Services</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Advertise with Us</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Advertising</Link>
                            </li>
                            <li>
                                <Link to='#' className='text-light' style={{textDecoration: 'none'}}>Careers</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='text-center pt-5 footer-bottom'>
                    <p className='text-center text-light'>Build & design By <span style={{ color: 'tomato' }}> &copy; Abu Taher</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;