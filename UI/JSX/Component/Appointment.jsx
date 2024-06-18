import React, { useState } from 'react'
import { Card, CardBody, Col, Container, Form, Row } from 'reactstrap';
import { CustomButton } from '../Common/CustomButton.jsx';
import SelectValidate from '../Common/SelectValidate.jsx';
import { appointmentValidation } from '../utils/loginValidation.js';
import CustomDatePicker from '../Common/CustomDatePicker.jsx';

const initialState = {
    department: "",
    doctor: "",
    date: new Date()
};

const Appointment = () => {
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMsg] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleAppointment = (e) => {
        e.preventDefault();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        const error = appointmentValidation(name, value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorMsg((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };

    const handleDatePicker = (data) => {
        setFormData((prevState) => ({
            ...prevState,
            date: data,
        }));

    }

    const { department, doctor, date } = formData;
    const maximumDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

    console.log('formData :>> ', formData);

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <h3 className="text-center">Book An Appointment</h3>
                    <Col md="6">
                        <Card>
                            <CardBody className="px-lg-5 py-lg-5 mt-2">
                                <Form onSubmit={handleAppointment} noValidate>
                                    <SelectValidate
                                        name='department'
                                        label={"Select Department"}
                                        error={errorMessage?.department}
                                        onChange={handleChange}
                                        value={department}
                                        options={['Neurology', 'Orthopedics', 'Gynecology']}
                                    />
                                    <SelectValidate
                                        name='doctor'
                                        label={"Select Doctor"}
                                        error={errorMessage?.doctor}
                                        onChange={handleChange}
                                        value={doctor}
                                        options={['Dr. Devon Lachat', 'Dr. Skylar Mecca', 'Dr. Lana Mecca']}
                                    />
                                    <CustomDatePicker minDate={new Date()} maxDate={maximumDate} label="Select Consultation date" selected={date} handleDatePicker={handleDatePicker} />
                                    <CustomButton className="mt-4" type="submit" textValue="Proceed" loading={loading} />
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Appointment
