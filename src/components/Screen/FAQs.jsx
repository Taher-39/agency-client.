import React from "react";
import { Container, Accordion } from "react-bootstrap";
import Navbar from "../Home/Navbar/Navbar";

const FAQs = () => {
    return (
        <>
            <Navbar />
            <Container className="my-5">
                <h2>Frequently Asked Questions</h2>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Question 1?</Accordion.Header>
                        <Accordion.Body>Answer to question 1.</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    );
};

export default FAQs;
