import React from "react";
import { Form } from "react-bootstrap";

// commoon component for dropdown list
const SelectValidate = ({ ame, error, options, onChange, value, label }) => {
    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select aria-label={`Select ${name}`}  {...{ name, onChange, value }} isInvalid={!!error}>
                <option>Select {name}...</option>
                {options?.map((data, index) => (
                    <option key={index} value={data}>
                        {data}
                    </option>
                ))}
            </Form.Select>
            {error && (
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>
            )}
            <div className="mt-3"></div>
        </>
    );
}

export default SelectValidate;