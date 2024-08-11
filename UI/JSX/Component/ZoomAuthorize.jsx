import React from "react";
import { CustomButton } from "../Common/CustomButton.jsx";

const ZoomAuthorize = () => {
  const handleAuthorize = () => {
    window.location.href = `https://healthycare.onrender.com/oauth/authorize`;
  };

  return (
    <div>
      <CustomButton
        className="mt-5 myColor"
        textValue="Authorize with Zoom"
        onClick={handleAuthorize}
      />
    </div>
  );
};

export default ZoomAuthorize;
