import React from 'react'
import { Button, Spinner } from 'reactstrap'

export const CustomButton = ({ color = "primary", type = "submit", loading = false, textValue = "Click", className }) => {
    return (
        <div className="text-center">
            <Button {...{ color, type }} disabled={loading} {...{ className }}>
                {loading ? <Spinner size="sm" /> : textValue}
            </Button>
        </div>
    )
}
