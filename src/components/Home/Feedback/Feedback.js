import React, { useEffect, useState } from 'react';

const Feedback = () => {
    const [userFeedback, setUserFeedback] = useState([])
    useEffect(() => {
        fetch('https://protected-plateau-36631.herokuapp.com/getReview')
            .then(res => res.json())
            .then(data => setUserFeedback(data))
    }, [])
    return (
        <div className='my-5'>
            <div className="container">
                <h2 className='text-center my-5'>User Feedback</h2>
                <div className='row'>
                    {
                        userFeedback.map(review => <div key={review._id} className='col-md-4 d-flex align-items-stretch my-4'>
                            <div className="shadow p-4">
                                <h3 className='text-center'>{review.name}</h3>
                                <h5 className='text-center'>{review.designation}</h5>
                                <p>{review.description}</p>
                            </div>
                        </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Feedback;