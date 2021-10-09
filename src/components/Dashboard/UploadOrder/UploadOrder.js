import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/Sidebar';
import navLogo from '../../../images/logos/logo.png';

const UploadOrder = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [orderDetails, setOrderDetails] = useState({})
    const [orderFile, setOrderFile] = useState()
    const handleBlur = (e) =>{
        const newOrderDetails = { ...orderDetails, status: 'pending' }
        newOrderDetails[e.target.name] = e.target.value
        setOrderDetails(newOrderDetails)  
    }
    const handleFile = (e) => {
        setOrderFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        const newOrderForm = new FormData();
        newOrderForm.append('customerName', loggedInUser.name)
        newOrderForm.append('customerEmail', loggedInUser.email)
        newOrderForm.append('customerCategory', orderDetails.category)
        newOrderForm.append('customerDescription', orderDetails.projectDetails)
        newOrderForm.append('customerPrice', orderDetails.price)
        newOrderForm.append('status', orderDetails.status)
        newOrderForm.append('file', orderFile)
        
        fetch('https://protected-plateau-36631.herokuapp.com/uploadOrder', {
            method: 'POST',
            body: newOrderForm
        }).then(res => res.json())
        .then(data => {
                if(data){
                    alert('Order Submitted, Check Service List')
                }
        })
        e.preventDefault()
    }
    return (
        <div>
             <div style={{backgroundColor: '#FBD062'}}>
                <div className="d-sm-flex justify-content-around py-4">
                    <div>
                        <Link to="/">
                            <img src={navLogo} style={{width: '150px'}} alt="" />
                        </Link>
                    </div>
                    <div className='page-name'>
                        <h2>Order</h2>
                    </div>
                    <div>
                        <h5 className='user'>{loggedInUser.name}</h5>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="left-side col-md-2 btn-bg">
                    <Sidebar></Sidebar>
                </div>
                <div className="right-side col-md-10 bg-light p-5">
                    <form onSubmit={handleSubmit}>
                        <input className='form-control w-50 mb-3' type="text" name="name" placeholder="Your name / company's name" defaultValue={loggedInUser.name}/>
                        <input className='form-control w-50 mb-3' type="email" name="email" placeholder="Your email address" defaultValue={loggedInUser.email}/>
                        <input className='form-control w-50 mb-3' onBlur={handleBlur} type="text" name="category" placeholder="Graphics Design" required/>
                        <textarea className='form-control w-50 mb-3' onBlur={handleBlur} name="projectDetails" placeholder="project Details" cols="30" rows="5" required ></textarea>
                        <input className='form-control w-50 mb-3' onBlur={handleBlur} type="text" name="price" placeholder="Price" required />
                        <input className='form-control w-50 mb-3' onChange={handleFile} type="file" name="file"  required />
                        <button type='submit' className='btn btn-bg text-light' >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadOrder;