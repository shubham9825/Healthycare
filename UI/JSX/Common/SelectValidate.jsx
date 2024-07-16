import React from "react";
import { Input } from "reactstrap";

const SelectValidate = ({ name, error, options, onChange, value, label }) => {
    return (
        <>
            <span>{label}</span>
            <Input aria-label={`Select ${name}`} type="select"  {...{ name, onChange, value }}>
                <option disabled value="" >Select {name}...</option>
                {options?.map((data, index) => (
                    <option key={index} value={data}>
                        {data}
                    </option>
                ))}
            </Input>
            {error && (
                <div className="text-danger mt-1">{error}</div>
            )}
            <div className="mt-3"></div>
        </>
    );
}

export default SelectValidate;