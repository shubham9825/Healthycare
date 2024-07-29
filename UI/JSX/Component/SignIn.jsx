import React, { useState } from "react";
import { Card, CardBody, Form, Container, Row, Col } from "reactstrap";
import { loginValidation } from "../utils/loginValidation.js";
import { InputValidate } from "../Common/InputValidate.jsx";
import { CustomButton } from "../Common/CustomButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN } from "../Common/Schema.jsx";
import { showToast } from "../utils/toastService.js";
import { useDispatch } from "react-redux";
import { loginInSuccessAction } from "../Redux/auth/action.js";
import "../../Assets/Styles/SignIn.css";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMsg] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        const res = await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: SIGN_IN,
            variables: { email: email, password: password },
          }),
        });
        const result = await res.json();
        if (result?.data?.login?.token) {
          dispatch(loginInSuccessAction(result?.data));
          localStorage.setItem("token", result?.data?.login?.token);
          showToast("Login Successfully!", "success");
          navigate("/");
        } else {
          showToast(result?.errors[0]?.message, "error");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showToast(error?.message, "error");
      }
    }
  };

  return (
    <div className="login">
      <h3 className="text-center mb-3">Sign In</h3>
      <Form onSubmit={handleSignIn} noValidate>
        <div className="text_area">
          <InputValidate
            type="email"
            name="email"
            placeholder="Email"
            error={errorMessage.email}
            value={formData.email}
            onChange={handleInputChange}
            className="text_input"
            disabled={loading}
          />
        </div>
        <div className="text_area">
          <InputValidate
            type="password"
            name="password"
            placeholder="Password"
            error={errorMessage.password}
            value={formData.password}
            onChange={handleInputChange}
            className="text_input"
            disabled={loading}
          />
        </div>
        <div className="text-center">
          <small>
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </small>
        </div>
        <CustomButton
          type="submit"
          textValue="Sign In"
          className="mt-3"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default SignIn;
