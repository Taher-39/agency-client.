import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { MdHome, MdAddShoppingCart, MdCommentBank, MdDescription, MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaPlus} from "react-icons/fa";
import './Sidebar.css'

const Sidebar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch('https://protected-plateau-36631.herokuapp.com/isAdmin',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: loggedInUser.email})
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data)
                setLoading(false)
            })
    },[])

    return (
        <div>
            <nav>
                <ul>
                    <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/"><MdHome /> Home</Link></li>
                       {
                           loading ? <p>loading...</p> 
                           :
                           <div>
                                {
                                    isAdmin ?
                                        <div>
                                            <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/totalOrderList"><MdDescription /> Order Lists</Link></li>
                                            <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/addService"><FaPlus /> AddService</Link></li>
                                            <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/addAdmin"><MdOutlineAdminPanelSettings /> Add-Admin</Link></li>
                                        </div>
                                        :
                                        <div>
                                            <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/uploadOrder"><MdAddShoppingCart /> Order</Link></li>
                                            <li className='sidebar-links pb-2'><Link className='sidebar-link' to="/userOrders"><MdDescription /> Service List</Link></li>
                                            <li className='sidebar-links'><Link className='sidebar-link' to="/getUserReview"><MdCommentBank />  Review</Link></li>
                                        </div>
                                }
                           </div>
                       }
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;