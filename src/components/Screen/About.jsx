import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "../Home/Navbar/Navbar";

const About = () => {
    return (
        <>
            <Navbar />
            <Container className="my-5">
                <Row>
                    <Col>
                        <h2>About Us</h2>
                        <p>
                            Creative Agency works for website creation, graphics design, and video editing.
                        </p>
                        <Link to='/' className='btn btn-bg text-light'>Home</Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default About;
