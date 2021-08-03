import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [review, setReview] = useState({})

    const handleBlur = (e) => {
        const newReview = { ...review, name: loggedInUser.name}
        newReview[e.target.name] = e.target.value;
        setReview(newReview)
    }
    const handleSubmit = (e) => {
        fetch('http://localhost:4000/postReview', {
            method: 'POST',
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        }).then(res => {
            alert("Review Added Successfully.")
        })
        e.preventDefault()
    }
     return(
        <div>
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                 <form onSubmit={handleSubmit}>
                     <input type="text" name="name" placeholder="Your Name" defaultValue={loggedInUser.name} />
                     <input onBlur={handleBlur} type="text" name="designation" placeholder="Company's name / Designation" />
                     <textarea onBlur={handleBlur} cols="30" rows='10' name='description'></textarea>
                     <button type='submit'>Submit</button>
                 </form>
            </div>
        </div>
    )
}

export default Review;