import React from "react";
import "../Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [details, setdetails] = useState({});
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/about");
        const detail = response.data;
        console.log(detail[0]);
        setdetails(detail[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load students");
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="profile-card-wrapper">
      <div className="profile-card">
        <h2 className="profile-card-title">Profile Details</h2>

        <div className="profile-card-item">
          <strong>name</strong> <span>{details.name}</span>
        </div>
        <div className="profile-card-item">
          <strong>Room Number:</strong> <span>{details.student_id}</span>
        </div>
        <div className="profile-card-item">
          <strong>Roommate Name:</strong> <span>Raju</span>
        </div>
        <div className="profile-card-item">
          <strong>Address:</strong> <span>{details.state}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
