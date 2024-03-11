import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Settings() {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    addressLine: '',
    landmark: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    password:'',
  });

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchUserDetails(userEmail)
        .then((userData) => {
          setUserDetails(userData);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error.message);
        });
    }
  }, []);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/events/user-details?emailOrMobileNumber=${email}`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch user details. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  };
  return (
<div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 pb-5">
          <form className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input className="form-control" type="text" id="firstName" value={userDetails.firstName} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input className="form-control" type="text" id="lastName" value={userDetails.lastName} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">E-mail Address</label>
                <input className="form-control" type="email" id="email" value={userDetails.email} disabled />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mobileNumber">Phone Number</label>
                <input className="form-control" type="text" id="mobileNumber" value={userDetails.mobileNumber} required />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input className="form-control" type="password" id="password" value={userDetails.password} required />
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input className="form-control" type="password" id="password" value={userDetails.password} required />
              </div>
            </div>
          
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
