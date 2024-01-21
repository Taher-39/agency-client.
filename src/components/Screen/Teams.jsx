import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../Home/Navbar/Navbar";

const Teams = () => {
    return (
        <>
            <Navbar />
            <Container className="my-5">
                <h2>Our Team</h2>
                <Row>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 1</h4>
                            <p>Role: Video Editor</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 2</h4>
                            <p>Role: Web Developer</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 3</h4>
                            <p>Role: Graphics Designer</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 4</h4>
                            <p>Role: Content Writter</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 5</h4>
                            <p>Role: App Developer</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div>
                            <h4>Team Member 6</h4>
                            <p>Role: SEO Expert</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Teams;
