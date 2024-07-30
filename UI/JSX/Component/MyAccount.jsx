import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../Assets/Styles/MyAccount.css";

const MyAccount = () => {
  return (
    <Container fluid className="my-account-page p-4">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              {/* <img
                src="path/to/profile-picture.jpg"
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
              /> */}
              <h5>John Doe</h5>
              <p>john.doe@example.com</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card className="mb-4">
            <Card.Header>Account Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter a new password"
                  />
                </Form.Group>
                <Button variant="primary" className="mt-4" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Patient Information</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formDob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter your address" />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
                <Form.Group controlId="formEmergencyContact">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter emergency contact name"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="mt-4 myColor"
                  type="submit"
                >
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <ul className="list-group">
                <li className="list-group-item">
                  Appointment with Dr. Smith on July 20, 2024
                </li>
                <li className="list-group-item">
                  Prescription refilled for John Doe on July 18, 2024
                </li>
                <li className="list-group-item">
                  Lab results received on July 15, 2024
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
