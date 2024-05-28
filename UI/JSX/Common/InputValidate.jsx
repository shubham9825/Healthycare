import React from 'react';
import { Form } from 'react-bootstrap';

// common component for input field 
class InputValidate extends React.Component {
    render() {
        const { name, placeholder, error, type, value, onChange, label } = this.props;

        return (
            <>
                <Form.Group className="mb-3">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control
                        type={type || 'text'}
                        name={name}
                        placeholder={placeholder || name}
                        value={value || ''}
                        {...{ onChange }}
                        isInvalid={!!error}
                    />

                    <Form.Control.Feedback type="invalid">
                        {error}
                    </Form.Control.Feedback>
                </Form.Group>
            </>
        );
    }
}

export default InputValidate;
