import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() =>{
        fetch('https://protected-plateau-36631.herokuapp.com/getServices')
            .then(res => res.json())
            .then(data => {
                setServices(data)
            })
    }, [])
    return (
        <div>
            <div className="container">
                <h3 className='text-center my-5'>Our Recent Services</h3>
                <div className='row'>
                    {
                        services.length ?
                            services.map(serviceData => <ServiceCard key={serviceData._id} serviceData={serviceData}></ServiceCard>)
                            : <h4 className='text-center pt-5 text-secondary'>Loading</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;