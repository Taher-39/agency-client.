import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';

const UploadOrder = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [orderDetails, setOrderDetails] = useState({})
    const [orderFile, setOrderFile] = useState()

    const handleBlur = (e) =>{
        const newOrderDetails = { ...orderDetails }
        newOrderDetails[e.target.name] = e.target.value
        setOrderDetails(newOrderDetails)  
    }
    const handleFile = (e) => {
        setOrderFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        const newOrderForm = new FormData();
        newOrderForm.append('customerName', loggedInUser.name)
        newOrderForm.append('customerEmail', loggedInUser.email)
        newOrderForm.append('customerCategory', orderDetails.category)
        newOrderForm.append('customerDescription', orderDetails.projectDetails)
        newOrderForm.append('customerPrice', orderDetails.price)
        newOrderForm.append('file', orderFile)
        
        fetch('https://protected-plateau-36631.herokuapp.com/uploadOrder', {
            method: 'POST',
            body: newOrderForm
        }).then(res => res.json())
        .then(data => {
                alert('Order Submitted, Check Service List')
        })
        e.preventDefault()
    }
    return (
        <div className='container'>
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <h2>Order</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your name / company's name" defaultValue={loggedInUser.name}/> <br />
                    <input type="email" name="email" placeholder="Your email address" defaultValue={loggedInUser.email}/><br />
                    <input onBlur={handleBlur} type="text" name="category" placeholder="Graphics Design" /><br />
                    <textarea onBlur={handleBlur} name="projectDetails" placeholder="project Details" cols="30" rows="10"></textarea><br />
                    <input onBlur={handleBlur} type="text" name="price" placeholder="Price" /> <br />
                    <input onChange={handleFile} type="file" name="file"  />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UploadOrder;