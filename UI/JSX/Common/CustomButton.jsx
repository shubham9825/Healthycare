import React from 'react'
import { Button, Spinner } from 'reactstrap'

export const CustomButton = ({ color = "primary", type = "submit", loading = false, textValue = "Click" }) => {
    return (
        <div className="text-center">
            <Button {...{ color, type }} disabled={loading}>
                {loading ? <Spinner size="sm" /> : textValue}
            </Button>
        </div>
    )
}
