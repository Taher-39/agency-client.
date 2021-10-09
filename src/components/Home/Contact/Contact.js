import React, { useContext } from "react";
import { UserContext } from "../../../App";

const Contact = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleSubmit = () => {
        alert('Message is on the way...');
    }
    return(
        <div className='header-bg contact'>
            <div className='container contact-body'>
                <div className='row py-5'>
                    <div className='col-sm-6'>
                        <h1 className='text-contact'>Let us handle your <br /> <span>project, professionally.</span></h1>
                        <p className='py-3'>
                            With well written codes, we build amazing apps for <br /> all platforms, mobile and web apps in general.
                        </p>
                    </div>
                    <div className='col-sm-6'>
                        <form onSubmit={handleSubmit}>
                            <input className='form-control w-75 mb-3' type="text" name="name" placeholder="Your Name" defaultValue={loggedInUser.name} />
                            <input className='form-control w-75 mb-3' type="text" name="designation" placeholder="Company's name / Designation" required />
                            <textarea className='form-control w-75 mb-3' cols="30" rows='6' name='description' required></textarea>
                            <button className='btn btn-bg text-light' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;