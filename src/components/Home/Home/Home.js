import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Services from '../Services/Services';
import Feedback from '../Feedback/Feedback';
import Customer from '../Customer/Customer';
import Works from '../Works/Works';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <Customer />
            <Services></Services>
            <Works />
            <Feedback></Feedback>
        </div>
    )
}

export default Home;