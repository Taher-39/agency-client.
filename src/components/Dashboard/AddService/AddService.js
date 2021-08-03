import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AddService = () => {
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

        fetch('http://localhost:4000/addService',{
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
            <div className="left-side">
                <Sidebar></Sidebar>
            </div>
            <div className="right-side">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-area">
                        <label >Service Title
                            <input type="text" placeholder='App-Develop' onBlur={handleServiceName}/>
                        </label> <br />

                        <label>Icon
                            <input type="file" name='icon' onChange={handleFileChange}/>
                        </label> <br />

                        <label>Description
                           
                        </label><br />
                        <textarea rows="4" cols="50" onBlur={handleDescription} />
                        
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddService;