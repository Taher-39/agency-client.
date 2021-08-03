import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Services from '../Services/Services';
import Feedback from '../Feedback/Feedback';

const Home = () => {
    console.log()
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <Services></Services>
            <Feedback></Feedback>
        </div>
    )
}

export default Home;