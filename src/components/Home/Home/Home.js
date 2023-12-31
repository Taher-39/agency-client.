import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Services from '../Services/Services';
import Feedback from '../Feedback/Feedback';
import Customer from '../Customer/Customer';
import Works from '../Works/Works';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <Customer />
            <Services></Services>
            <Works />
            <Feedback></Feedback>
            <Contact></Contact>
            <Customer />
            <Footer></Footer>
        </div>
    )
}

export default Home;