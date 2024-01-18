import React from 'react';
import airbnb from '../../../assets/logos/airbnb.png';
import google from '../../../assets/logos/google.png';
import netflix from '../../../assets/logos/netflix.png';
import slack from '../../../assets/logos/slack.png';
import uber from '../../../assets/logos/uber.png';

const Customer = () => {
    return (
        <div className="container">
            <div className='client d-sm-flex justify-content-between py-5'>
                <div>
                    <img src={airbnb} style={{ width: '100px' }} alt="" />
                </div>
                <div>
                    <img src={google} style={{ width: '100px' }} alt="" />
                </div>
                <div>
                    <img src={netflix} style={{ width: '100px' }} alt="" />
                </div>
                <div>
                    <img src={slack} style={{ width: '100px' }} alt="" />
                </div>
                <div>
                    <img src={uber} style={{ width: '80px' }} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Customer;