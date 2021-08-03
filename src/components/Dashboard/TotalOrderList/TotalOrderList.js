import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import TotalOrderListTable from './TotalOrderListTable';

const TotalOrderList = () => {
    const [totalOrders, setTotalOrders] = useState([])
    useEffect(()=>{
        fetch('http://localhost:4000/getTotalOrders')
            .then(res => res.json())
            .then(data => {
                setTotalOrders(data)
            })
    }, [])
    return (
        <div>
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <h2 className='text-secondary text-center my-4'>Total Order List</h2>
                <div>
                    {   
                        totalOrders.length ?
                        <TotalOrderListTable totalOrders={totalOrders}></TotalOrderListTable>
                        : <h4 className='text-center pt-5 text-secondary'>Loading</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default TotalOrderList;