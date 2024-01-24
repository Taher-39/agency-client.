import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Home/Navbar/Navbar';
import { UserContext } from '../../App';

const JoinUsForm = () => {
    const { loggedInUser } = useContext(UserContext);
    const id = loggedInUser._id;

    const [formData, setFormData] = useState({
        country: '',
        city: '',
        experience: '',
        role: '',
        gender: '',
        resume: '',
    });

    const [roleOptions, setRoleOptions] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
        }));
        try {
            const response = await fetch(`https://agency-server-git-main-taher-39.vercel.app/member/join-us/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                const data = await response.json();
                toast.success('Member added successfully! We will contact you soon using email.');
                console.log('New member:', data);
                setFormData({
                    country: '',
                    city: '',
                    experience: '',
                    role: '',
                    gender: '',
                    resume: '',
                });
            } else {
                toast.error('Error adding member. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const fetchRoleOptions = async () => {
        try {
            const response = await fetch('https://agency-server-git-main-taher-39.vercel.app/services/get-all-services');
            const data = await response.json();

            const roleOptions = data.services?.map((service) => service.name);
            setRoleOptions(roleOptions || []);
        } catch (error) {
            console.error('Error fetching role options:', error);
        }
    };


    useEffect(() => {
        fetchRoleOptions();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container my-5 d-flex justify-content-center align-items-center">
                <div className="w-50">
                    <h2 className="text-center mb-4">Submit Join Us Form</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="country" className="d-block ">Country</label>
                            <input
                                type="text"
                                className="form-control mx-auto"
                                placeholder="Enter your country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city" className="d-block">City</label>
                            <input
                                type="text"
                                className="form-control mx-auto"
                                placeholder="Enter your city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="experience" className="d-block">Experience</label>
                            <input
                                type="text"
                                className="form-control mx-auto"
                                placeholder="Enter your experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role" className="d-block">Role</label>
                            <select
                                className="form-control mx-auto"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select a role</option>
                                {roleOptions?.map((roleOption) => (
                                    <option key={roleOption} value={roleOption}>{roleOption}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender" className="d-block">Gender</label>
                            <select
                                className="form-control mx-auto"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" disabled>Select a gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="resume" className="d-block">Resume/CV</label>
                            <input
                                type="text"
                                className="form-control mx-auto"
                                placeholder="Enter your resume/CV link"
                                name="resume"
                                value={formData.resume}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="mt-2 btn btn-bg text-light mx-auto d-block">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default JoinUsForm;
