import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddAdmin = () => {
    const [admin, setAdmin] = useState({})
    const handleBlur = (e) => {
        const adminEmail = {issueDate: new Date()}
        adminEmail[e.target.name] = e.target.value;
        setAdmin(adminEmail)
    }
    console.log(admin)
    const handleSubmit = (e) => {
        fetch("http://localhost:4000/addAdmin", {
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
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <h3>Add New Admin</h3>
                <form onSubmit={handleSubmit}>
                    <input onBlur={handleBlur} type="email" name="email" placeholder='jon@email.com' />'
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;