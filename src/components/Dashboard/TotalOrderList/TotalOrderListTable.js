import React from 'react';

const TotalOrderListTable = ({ totalOrders }) => {
    // const {name, email, category, description} = order;
    return (
        <div>
            <div className='bg-light rounded container p-4 shadow'>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Id</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalOrders.map((order) => <tr key={order._id} className='m-3 p-3'>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.category}</td>
                                <td>{order.description}</td>
                                <td>Pending</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalOrderListTable;