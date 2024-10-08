import React, { useState } from "react";
import {
    Card,
    CardBody,
    Form,
    Container,
    Row,
    Col
} from "reactstrap";
import { loginValidation } from "../utils/loginValidation.js";
import { InputValidate } from "../Common/InputValidate.jsx";
import { CustomButton } from "../Common/CustomButton.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { SIGN_IN } from "../Common/Schema.jsx";
import { showToast } from "../utils/toastService.js";

const initialState = {
    email: "",
    password: "",
};

const SignIn = () => {
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMsg] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const error = loginValidation(name, value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorMsg((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { email, password } = formData;

        const emailError = loginValidation("email", email);
        const passwordError = loginValidation("password", password);

        setErrorMsg({
            email: emailError,
            password: passwordError,
        });

        if (!emailError && !passwordError) {
            setLoading(true);
            try {
                const res = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: SIGN_IN, variables: { email: email, password: password } }),
                });
                const result = await res.json()
                if (result?.data?.login?.token) {
                    localStorage.setItem('token', result?.data?.login?.token)
                    navigate('/');
                } else {
                    showToast(result?.errors[0]?.message, 'error')
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showToast(error?.message, 'error')
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card>
                        <CardBody className="px-lg-5 py-lg-5">
                            <h3 className="text-center">Sign In</h3>
                            <Form onSubmit={handleSignIn} noValidate>
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
                                <div className="text-center mb-2">
                                    <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
                                </div>
                                <CustomButton type="submit" textValue="Sign In" loading={loading} />
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
