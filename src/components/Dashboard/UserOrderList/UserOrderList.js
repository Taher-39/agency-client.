import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import UserOrderCard from './UserOrderCard';

const UserOrderList = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [userOrders, setUserOrders] = useState([])
    useEffect(() => {
        fetch('https://protected-plateau-36631.herokuapp.com/getUserOrders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setUserOrders(data))
    },[])
    return (
        <div className='container'>
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <h3 className='text-secondary text-center my-4'>Order List</h3>
                <div className="row">
                    {
                        userOrders.length ?
                        userOrders.map(order => <UserOrderCard order={order} key={order._id}></UserOrderCard>)
                            : <h4 className='text-center pt-5 text-secondary'>Loading</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserOrderList;