import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const Sidebar = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() => {
        fetch('https://protected-plateau-36631.herokuapp.com/isAdmin',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: loggedInUser.email})
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data))
    },[])
    console.log(isAdmin)
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                       {
                            isAdmin ?
                            <div>
                                <li><Link to="/totalOrderList">Total-Order-List</Link></li>
                                <li><Link to="/addService">AddService</Link></li>
                                <li><Link to="/addAdmin">Add-Admin</Link></li>
                            </div>
                        : 
                    
                            <div>
                                <li><Link to="/uploadOrder">uploadOrder</Link></li>
                                <li><Link to="/userOrders">User-Order-List</Link></li>
                                <li><Link to="/getUserReview">Review</Link></li>
                            </div>
                        }
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;