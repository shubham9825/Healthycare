import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import { CustomButton } from "../Common/CustomButton.jsx";
import SelectValidate from "../Common/SelectValidate.jsx";
import CustomDatePicker from "../Common/CustomDatePicker.jsx";
import {
  CREATE_APPOINTMENT,
  GET_DEPARTMENT,
  GET_DOCTOR,
} from "../Common/Schema.jsx";
import { setHours, setMinutes, isWeekend } from "date-fns";
import { useSelector } from "react-redux";
import { showToast } from "../utils/toastService.js";

const initialState = {
  department: "",
  doctor: "",
  date: "",
};

const apiInitialState = {
  departments: [],
  doctors: [],
};

const Appointment = () => {
  const [formData, setFormData] = useState(initialState);
  const [apiData, setApiData] = useState(apiInitialState);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.authentication?.loggedUser);

  useEffect(() => {
    getDepartment();
  }, []);

  useEffect(() => {
    if (formData.department) {
      getDoctor();
    }
  }, [formData.department]);

  const getDepartment = async () => {
    try {
      const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_DEPARTMENT }),
      });
      const result = await res.json();
      setApiData((prevState) => ({
        ...prevState,
        departments: result?.data?.departments,
      }));
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  const getDoctor = async () => {
    const deptID = apiData?.departments.find(
      (data) => data.name === formData.department
    );
    try {
      const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_DOCTOR,
          variables: { departmentId: deptID?.id },
        }),
      });
      const result = await res.json();
      setApiData((prevState) => ({
        ...prevState,
        doctors: result?.data?.doctors,
      }));
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDatePicker = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      date: data,
    }));
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    const cloneFormData = { ...formData };
    cloneFormData.userId = userId?.login?.user?.id;
    cloneFormData.doctorId = apiData?.doctors.find(
      (data) => data.name === cloneFormData?.doctor
    )?.id;

    try {
      const res = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: CREATE_APPOINTMENT,
          variables: { input: cloneFormData },
        }),
      });
      const result = await res.json();
      showToast("Your appointment has been booked!", "success");
      //   setApiData((prevState) => ({
      //     ...prevState,
      //     doctors: result?.data?.doctors,
      //   }));
    } catch (error) {
      showToast(error?.message, "error");
    }
    console.log("userId :>> ", cloneFormData);
  };

  const { department, doctor, date } = formData;
  const maximumDate = new Date(new Date().setMonth(new Date().getMonth() + 1));

  return (
    <>
      <Container className="appointment-container mt-5">
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" lg="6">
            <h3 className="text-center mb-4">Book An Appointment</h3>
            <Card>
              <CardBody>
                <Form onSubmit={handleAppointment}>
                  <SelectValidate
                    name="department"
                    label={"Select Department"}
                    onChange={handleChange}
                    value={department}
                    options={apiData?.departments.map(
                      (department) => department.name
                    )}
                  />

                  {formData?.department ? (
                    <SelectValidate
                      name="doctor"
                      label={"Select Doctor"}
                      onChange={handleChange}
                      value={doctor}
                      options={apiData?.doctors.map((doctor) => doctor.name)}
                    />
                  ) : (
                    ""
                  )}

                  {formData?.doctor ? (
                    <CustomDatePicker
                      showTimeSelect
                      timeFormat="HH:mm"
                      minTime={setHours(setMinutes(new Date(), 0), 10)}
                      maxTime={setHours(setMinutes(new Date(), 0), 17)}
                      minDate={new Date()}
                      maxDate={maximumDate}
                      label="Select Consultation date"
                      dateFormat="MMMM d, yyyy HH:mm"
                      selected={date}
                      placeholderText="Select date and time"
                      filterDate={(date) => !isWeekend(date)}
                      handleDatePicker={handleDatePicker}
                    />
                  ) : (
                    ""
                  )}

                  {formData?.date ? (
                    <CustomButton
                      className="mt-2"
                      type="submit"
                      textValue="Book"
                      loading={loading}
                    />
                  ) : (
                    ""
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Appointment;
