import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ handleDatePicker, label, ...rest }) => {

    const handleChange = (e) => {
        handleDatePicker(e)
    }

    return (
        <>
            <span>{label}</span>
            <DatePicker onChange={handleChange} monthShown={2} showIcon toggleCalendarOnIconClick {...rest} />
        </>
    )
}

export default CustomDatePicker
