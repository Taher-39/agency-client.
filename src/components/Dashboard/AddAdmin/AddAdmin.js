import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import navLogo from '../../../images/logos/logo.png';
import { UserContext } from '../../../App';

const AddAdmin = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [admin, setAdmin] = useState({})
    const handleBlur = (e) => {
        const adminEmail = {issueDate: new Date()}
        adminEmail[e.target.name] = e.target.value;
        setAdmin(adminEmail)
    }
    console.log(admin)
    const handleSubmit = (e) => {
        fetch("https://protected-plateau-36631.herokuapp.com/addAdmin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin)
        })
        .then(data => data.json())
        .then(res => {
                alert('New Admin Added')
            
        })

        e.preventDefault()
    }
    return (
        <div>
            <div style={{backgroundColor: '#d6d0c2'}}>
                <div className="d-sm-flex justify-content-around py-4">
                    <div>
                        <Link to="/">
                            <img src={navLogo} style={{width: '150px'}} alt="" />
                        </Link>
                    </div>
                    <div className='page-name'>
                        <h2>Add New Admin</h2>
                    </div>
                    <div>
                        <h5 className='user'>{loggedInUser.name}</h5>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="left-side col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="right-side col-md-10 bg-light rounded p-5">
                    <form onSubmit={handleSubmit}>
                        <input  className='form-control w-50 mb-3' onBlur={handleBlur} type="email" name="email" placeholder='jon@email.com' required />'
                        <button className='btn btn-bg text-light' type="submit">Submit</button>
                    </form>
                </div>
            </div>    
        </div>
    );
};

export default AddAdmin;