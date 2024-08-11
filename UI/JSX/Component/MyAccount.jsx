import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../../Assets/Styles/MyAccount.css";
import {
  CREATE_USER_PROFILE,
  GET_ACCOUNT_DETAILS,
  UPDATE_USER_PROFILE,
} from "../Common/Schema.jsx";
import { useSelector } from "react-redux";
import { InputValidate } from "../Common/InputValidate.jsx";
import { CustomButton } from "../Common/CustomButton.jsx";
import { accountValidation } from "../utils/loginValidation.js";
import { showToast } from "../utils/toastService.js";

const initialState = {
  name: "",
  dob: "",
  address: "",
  phoneNo: "",
  emergencyName: "",
  emergencyPhNo: "",
};

const formInitialState = {
  ...initialState,
  activity: [
    "Appointment with Dr. Smith on July 20, 2024",
    "Lab results received on July 15, 2024",
  ],
};

const namingConversion = {
  name: "Name",
  dob: "DOB",
  address: "Address",
  phoneNo: "Phone Number",
  emergencyName: "Emergency Contact Name",
  emergencyPhNo: "Emergency Contact No",
};

const MyAccount = () => {
  const [formData, setFormData] = useState(formInitialState);
  const [errorMessage, setErrorMsg] = useState(initialState);
  const [userUpdated, setUserUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedUser = useSelector(
    (state) => state?.authentication?.loggedUser?.login?.user
  );

  useEffect(() => {
    getAccountDetails();
  }, []);

  const getAccountDetails = async () => {
    try {
      const res = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          query: GET_ACCOUNT_DETAILS,
          variables: { userId: loggedUser?.id },
        }),
      });
      const result = await res.json();
      const userProfile = result?.data?.getUserProfile;

      userProfile ? setUserUpdated(true) : setUserUpdated(false);
      userProfile && setFormData(userProfile);
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const error = accountValidation(name, value);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrorMsg((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleAccount = async (event) => {
    event.preventDefault();
    const newErrors = {};
    let hasError = false;

    for (const [key, value] of Object.entries(formData)) {
      const error = accountValidation(key, value, namingConversion[key]);
      newErrors[key] = error;
      if (error !== "") {
        hasError = true;
      }
    }

    setErrorMsg(newErrors);

    if (!hasError) {
      setLoading(true);
      try {
        const { ...inputData } = formData;

        let res;
        if (userUpdated) {
          res = await fetch("/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
            
            body: JSON.stringify({
              query: UPDATE_USER_PROFILE,
              variables: { input: inputData, userId: loggedUser?.id },
            }),
          });
        } else {
          res = await fetch("/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              query: CREATE_USER_PROFILE,
              variables: { input: inputData },
            }),
          });
        }
        const result = await res.json();
        const userData = result?.data?.createUserProfile;
        if (userData) {
          setFormData(userData);
          showToast("User Profile Updated Successfully!", "success");
        } else {
          result?.errors && showToast(result?.errors[0]?.message, "error");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showToast(error?.message, "error");
      }
    }
  };

  return (
    <Container fluid className="my-account-page p-4">
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <h5>{formData?.name || ""}</h5>
              <p>{loggedUser?.email || ""}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card className="mb-4">
            <Card.Header>Patient Information</Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-2">
                  <Col md={6}>
                    <InputValidate
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      labelText="Name"
                      error={errorMessage.name}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={6}>
                    <InputValidate
                      type="date"
                      name="dob"
                      placeholder="Enter your DOB"
                      labelText="DOB"
                      error={errorMessage.dob}
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        rows={3}
                        value={formData.address}
                        isInvalid={!!errorMessage.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ fontSize: "17px" }}
                      >
                        {errorMessage.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <InputValidate
                      type="number"
                      name="phoneNo"
                      placeholder="Enter your phone number"
                      labelText="Phone Number"
                      error={errorMessage.phoneNo}
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md={6}>
                    <InputValidate
                      type="text"
                      name="emergencyName"
                      placeholder="Enter emergency contact name"
                      labelText="Emergency Contact Name"
                      error={errorMessage.emergencyName}
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={6}>
                    <InputValidate
                      type="number"
                      name="emergencyPhNo"
                      placeholder="Enter emergency contact number"
                      labelText="Emergency Contact Number"
                      error={errorMessage.emergencyPhNo}
                      value={formData.emergencyPhNo}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <CustomButton
                  type="submit"
                  textValue={!userUpdated ? "Save Changes" : "Edit"}
                  className="mt-3 myColor"
                  loading={loading}
                  onClick={handleAccount}
                />
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
