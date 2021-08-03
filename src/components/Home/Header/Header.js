import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleHireUs = () => {

    }
    return (
        <div>
            <div className="text-center my-5">
                <Link to="/uploadOrder">
                    <button className='btn btn-danger' onClick={handleHireUs}>Hire Us</button>
                </Link>
            </div>
        </div>
    );
};

export default Header;