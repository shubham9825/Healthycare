import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export class NotFound extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs={10} md={8} lg={6}>
                        <div className="text-center mt-5">
                            <h1>Page not found</h1>
                            <p className="mt-3">The page you are looking for does not exist.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NotFound;
