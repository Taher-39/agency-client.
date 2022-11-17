import React from 'react';
import airbnb from '../../../images/logos/airbnb.png';
import google from '../../../images/logos/google.png';
import netflix from '../../../images/logos/netflix.png';
import slack from '../../../images/logos/slack.png';
import uber from '../../../images/logos/uber.png';

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