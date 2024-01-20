import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h2>About Us</h2>
                    <p>
                        Creative Agency works for website creation, graphics design, and video editing.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
