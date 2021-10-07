import React from 'react';
import './ServiceCard.css'

const ServiceCard = ({ serviceData }) => {
    const {title, description, image} = serviceData;
    console.log(title);
    return (
        <div className='col-md-4 d-flex align-items-stretch my-2 zoom'>
            <div className="shadow p-4">
                <div className="text-center my-2">
                    <img style={{ width: '50px', height: '50px' }} src={`data:image/png;base64, ${image.img}`} alt="" />
                </div>
                <h4 className='text-center'>{title}</h4>
                <p className='text-center'>{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;