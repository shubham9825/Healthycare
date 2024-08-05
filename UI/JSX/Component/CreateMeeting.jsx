import React, { useState } from "react";
import axios from "axios";

const CreateMeeting = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    topic: "",
    start_time: "",
    duration: 30,
    timezone: "UTC",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/create-meeting", // Ensure this matches your backend endpoint
        meetingDetails,
        { withCredentials: true }
      );
      console.log("Meeting created:", response.data);
    } catch (err) {
      console.error("Error creating meeting:", err);
      setError("Error creating meeting. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Meeting</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input
            type="text"
            name="topic"
            value={meetingDetails.topic}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="start_time"
            value={meetingDetails.start_time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={meetingDetails.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Timezone:
          <input
            type="text"
            name="timezone"
            value={meetingDetails.timezone}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create Meeting</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default CreateMeeting;
