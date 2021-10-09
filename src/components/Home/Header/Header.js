import React from 'react';
import { Link } from 'react-router-dom';
import headerImg from '../../../images/logos/Frame.png';

import './Header.css';

const Header = () => {
    return (
        <div className='header-bg header'>
            <div className="container">
                <div className="row py-5">
                    <div className="col-md-6 pb-5 header-left">
                        <h1 className='text-header '>
                            <span className='header-top'>Let's Grow Your</span><br />
                            <span className='header-middle'>Brand To The</span><br />
                            <span className='header-bottom'>Next Level</span>
                        </h1>
                        <p className='text-description py-3'>
                            Online Agency is your instant link to thousands <br />
                            of creative agents. For twenty years we've been the industry's <br />
                            leading link between online creative agents.
                        </p>
                        <button className="btn btn-bg py-2">
                            <Link className='text-light' style={{textDecoration: 'none', padding: '0px 30px'}} to="/uploadOrder">
                                Hire Us
                            </Link>
                        </button>
                    </div>
                    <div className="col-md-6 pb-5">
                        <div className="text-center p-3 d-sm">
                            <img src={headerImg} className='header-img' alt="" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Header;