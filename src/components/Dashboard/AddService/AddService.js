import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import navLogo from '../../../images/logos/logo.png'; 
import { UserContext } from '../../../App';

const AddService = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [serviceName, setServiceName] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()

    const handleServiceName = (e) => {
        setServiceName(e.target.value)
    }
    const handleDescription = (e) =>{
        setDescription(e.target.value)
    }
    const handleFileChange = (e) =>{
        setFile(e.target.files[0])
    }
    const handleFormSubmit = (e) =>{
        const serviceFormData = new FormData()
        serviceFormData.append("title", serviceName)
        serviceFormData.append("file", file)
        serviceFormData.append("description", description)

        fetch('https://protected-plateau-36631.herokuapp.com/addService',{
            method: 'POST',
            body: serviceFormData
        }).then(res => res.json())
        .then(data => {
            if(data){
                alert("Data Added")
            }
        })
        .catch(err => console.log(err))
    
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
            <div className="left-side col-md-2">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side col-md-10 bg-light p-5">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-area">
                        <label >Service Title
                            <input className='form-control mb-3' type="text" placeholder='App-Develop' required onBlur={handleServiceName}/>
                        </label><br />

                        <label>Icon
                            <input className='form-control mb-3' type="file" name='icon' required onChange={handleFileChange}/>
                        </label><br />

                        <label>Description
                           
                        </label>
                        <textarea className='form-control w-50 mb-3' rows="4" cols="50" onBlur={handleDescription} required />
                        
                    </div>
                    <button className='btn btn-bg text-light' type="submit">Submit</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AddService;