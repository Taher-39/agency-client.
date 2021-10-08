import React from 'react';

const UserOrderCard = ({order}) => {
    return (
        <div className='col-md-6 d-flex align-items-stretch my-3'>
            <div className="shadow p-4">
                <div className="d-flex justify-content-around">
                    <div className="img">
                        <img style={{ width: '50px', height: '50px' }} src={`data:image/png;base64, ${order?.image?.img}`} alt="" />
                    </div>
                    <div className="status ml-4">
                        {order?.status}
                    </div>
                </div>
                <h4>{order.category}</h4>
                <p>{order.description}</p>
            </div>
        </div>
    );
};

export default UserOrderCard;