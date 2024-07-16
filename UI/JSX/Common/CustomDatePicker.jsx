import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ handleDatePicker, label, ...rest }) => {
  const handleChange = (e) => {
    handleDatePicker(e);
  };

  return (
    <>
      <div className="custom-date-picker">
        <label className="date-picker-label">{label}</label>
        <DatePicker
          showIcon
          onChange={handleChange}
          className="form-control"
          {...rest}
        />
      </div>
    </>
  );
};

export default CustomDatePicker;
