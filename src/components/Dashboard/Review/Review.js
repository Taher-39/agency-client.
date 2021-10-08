import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import navLogo from '../../../images/logos/logo.png';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [review, setReview] = useState({})

    const handleBlur = (e) => {
        const newReview = { ...review, name: loggedInUser.name}
        newReview[e.target.name] = e.target.value;
        setReview(newReview)
    }
    const handleSubmit = (e) => {
        fetch('https://protected-plateau-36631.herokuapp.com/postReview', {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        }).then(res => {
            if(res){
                alert("Review Added Successfully.")
            }
        })
        e.preventDefault()
    }/* d6d0c2 */
     return(
        <div>
            <div style={{backgroundColor: '#FBD062'}}>
                <div className="d-sm-flex justify-content-around py-4">
                    <div>
                        <Link to="/">
                            <img src={navLogo} style={{width: '150px'}} alt="" />
                        </Link>
                    </div>
                    <div className='page-name'>
                        <h2>Review</h2>
                    </div>
                    <div>
                        <h5 className='user'>{loggedInUser.name}</h5>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="left-side col-md-2" >
                    <Sidebar></Sidebar>
                </div>
                <div className="right-side col-md-10 bg-light p-5">
                    <form onSubmit={handleSubmit}>
                        <input className='form-control w-50 mb-3' type="text" name="name" placeholder="Your Name" defaultValue={loggedInUser.name} />
                        <input className='form-control w-50 mb-3' onBlur={handleBlur} type="text" name="designation" placeholder="Company's name / Designation" required />
                        <textarea className='form-control w-50 mb-3' onBlur={handleBlur} cols="30" rows='10' name='description' required></textarea>
                        <button className='btn btn-bg text-light' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Review;