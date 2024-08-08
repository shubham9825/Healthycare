import React, { useState } from "react";
import { Form } from "reactstrap";
import { loginValidation } from "../utils/loginValidation.js";
import { InputValidate } from "../Common/InputValidate.jsx";
import { CustomButton } from "../Common/CustomButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_UP } from "../Common/Schema.jsx";
import { showToast } from "../utils/toastService.js";
import "../../Assets/Styles/SignIn.css";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
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

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = formData;

    const emailError = loginValidation("email", email);
    const passwordError = loginValidation("password", password);
    const confirmPasswordError = loginValidation(
      "confirmPassword",
      confirmPassword
    );

    setErrorMsg({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!emailError && !passwordError && !confirmPasswordError) {
      setLoading(true);
      try {
        const res = await fetch("/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: SIGN_UP,
            variables: { email: email, password: password },
          }),
        });
        const result = await res.json();
        if (result?.data) {
          showToast("Your account has been created!", "success");
          navigate("/signIn");
          setLoading(false);
        } else {
          showToast(result?.errors[0]?.message, "error");
        }
        setLoading(false);
      } catch (error) {
        showToast(error?.message, "error");
        setLoading(false);
      }
    }
  };

  return (
    <div className="login">
      <h3 className="text-center mb-3">Sign Up</h3>
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
          <small>
            Already have an account?{" "}
            <Link to="/signin" className="link">
              Sign In
            </Link>
          </small>
        </div>
        <CustomButton
          className="mt-3 myColor"
          type="submit"
          textValue="Sign Up"
          loading={loading}
        />
      </Form>
    </div>
  );
};

export default Signup;
