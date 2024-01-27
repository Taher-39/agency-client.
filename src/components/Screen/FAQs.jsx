import React from "react";
import { Container, Accordion } from "react-bootstrap";
import Navbar from "../Home/Navbar/Navbar";

const FAQs = () => {
    const questions = [
        {
            id: 1,
            question: "SDLC steps are?",
            answer: "Planning, Analysis, Design, Implementation, Testing, Deployment, Maintenance",
        },
        {
            id: 2,
            question: "Explain Agile Methodology?",
            answer: "The Agile approach is valued for its ability to respond quickly to changing requirements, deliver tangible results early and frequently, and foster a collaborative and adaptive development culture. It is particularly effective in dynamic and uncertain project environments.",
        },
        {
            id: 3,
            question: "Which Testing you done for your app.",
            answer: "Unit Testing, Integration, Testing System, Testing Acceptance, Testing Regression, Testing Performance, Testing Security, Testing Usability"
        }
    ]
    return (
        <>
            <Navbar />
            <Container className="my-5">
                <h2>Frequently Asked Questions</h2>
                <Accordion>
                    {
                        questions.map((item, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{item.question}</Accordion.Header>
                                <Accordion.Body>{item.answer}</Accordion.Body>
                            </ Accordion.Item>
                        ))
                    }
                </Accordion>
            </Container >
        </>
    );
};

export default FAQs;
