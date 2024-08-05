import React, { useEffect } from "react";
import axios from "axios";

const ZoomCallback = () => {
  useEffect(() => {
    const fetchAccessToken = async () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:8000/callback?code=${code}`
          );
          console.log("Access Token:", response.data.accessToken);
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    fetchAccessToken();
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default ZoomCallback;
