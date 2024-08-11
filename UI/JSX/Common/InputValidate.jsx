import React from "react";
import { FormGroup, Input, InputGroup, Label } from "reactstrap";

export const InputValidate = ({
  name,
  placeholder,
  error,
  type,
  value,
  onChange,
  labelText,
  disabled,
  ...props
}) => {
  return (
    <>
      <FormGroup>
        {labelText ? <Label for={name}>{labelText}</Label> : ""}
        <InputGroup>
          <Input
            type={type || "text"}
            name={name}
            placeholder={placeholder || name}
            value={value || ""}
            {...{ onChange, disabled, ...props }}
            invalid={!!error}
          />
        </InputGroup>
        {error && <div className="text-danger mt-1">{error}</div>}
      </FormGroup>
    </>
  );
};
