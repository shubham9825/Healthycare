import React from 'react';
import { FormGroup, Input, InputGroup } from 'reactstrap';

export const InputValidate = ({ name, placeholder, error, type, value, onChange, disabled }) => {
    return (
        <>
            <FormGroup>
                <InputGroup>
                    <Input
                        type={type || 'text'}
                        name={name}
                        placeholder={placeholder || name}
                        value={value || ''}
                        {...{ onChange, disabled }}
                        invalid={!!error}
                    />
                </InputGroup>
                {error && (
                    <div className="text-danger mt-1">{error}</div>
                )}
            </FormGroup>
        </>
    );
};


