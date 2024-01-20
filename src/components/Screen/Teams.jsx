import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Teams = () => {
    return (
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
                        <p>Role: Developer</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div>
                        <h4>Team Member 3</h4>
                        <p>Role: Developer</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Teams;
