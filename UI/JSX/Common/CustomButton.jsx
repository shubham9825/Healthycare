import React from "react";
import { Button, Spinner } from "reactstrap";

export const CustomButton = ({
  color = "primary",
  type = "submit",
  loading = false,
  textValue = "Click",
  className,
  children,
  ...props
}) => {
  return (
    <div className="text-center">
      <Button {...{ color, type, className, ...props }} disabled={loading}>
        {loading ? <Spinner size="sm" /> : textValue || children}
      </Button>
    </div>
  );
};
