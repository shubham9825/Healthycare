import React from "react";
import { CustomButton } from "../Common/CustomButton.jsx";

const ZoomAuthorize = () => {
  const handleAuthorize = () => {
    window.location.href = `http://localhost:8000/oauth/authorize`;
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
