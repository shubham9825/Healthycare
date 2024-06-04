import React, { useState } from "react";
import { Card, CardBody, Form, Container, Row, Col } from "reactstrap";
import { LoginValidation } from "./LoginValidation";
import { InputValidate } from "../Common/InputValidate.jsx";
import { CustomButton } from "../Common/CustomButton.jsx";
import { Link } from 'react-router-dom';


const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
};

const Signup = () => {
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMsg] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const error = LoginValidation(name, value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorMsg((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = formData;

        const emailError = LoginValidation("email", email);
        const passwordError = LoginValidation("password", password);
        const confirmPasswordError = LoginValidation("confirmPassword", confirmPassword);

        setErrorMsg({
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        if (!emailError && !passwordError && !confirmPasswordError) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 8000);

            // API Call

        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card>
                        <CardBody className="px-lg-5 py-lg-5">
                            <h3 className="text-center">Sign Up</h3>
                            <Form onSubmit={handleSignUp} noValidate>
                                <InputValidate
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    error={errorMessage.email}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <InputValidate
                                    type="Password"
                                    name="password"
                                    placeholder="Password"
                                    error={errorMessage.password}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <InputValidate
                                    type="Password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    error={errorMessage.confirmPassword}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <div className="text-center mb-2">
                                    <small>Already have an account? <Link to="/signin">Sign In</Link></small>
                                </div>
                                <CustomButton type="submit" textValue="Sign Up" loading={loading} />
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Signup;
