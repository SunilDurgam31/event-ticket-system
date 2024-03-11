import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../images/user.webp';

function UserDashboard() {
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
    password: '',
    registerId: '',
  });

  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [showBookingsTable, setShowBookingsTable] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchUserDetails(userEmail)
        .then((userData) => {
          setUserDetails(userData);
          fetchTickets(userData.id);
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
        const userData = response.data;
        setUserDetails(userData);
        fetchTickets(userData.id);
        return userData;
      } else {
        throw new Error(`Failed to fetch user details. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error fetching user details: ${error.message}`);
    }
  };

  const fetchTickets = async (registerId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/events/register/${registerId}`);
      if (response.status === 200) {
        setTickets(response.data);
      } else {
        console.error('Failed to fetch tickets:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleSettingsClick = () => {
    setShowSettingsForm(true);
    setShowBookingsTable(false);
  };

  const handleBookingsClick = () => {
    setShowSettingsForm(false);
    setShowBookingsTable(true);
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="main-container">
        {/* Navigation bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <div className="navbar-brand">User Dashboard</div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleSettingsClick}>Profile Settings</button>
                </li>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleBookingsClick}>My Bookings</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Render settings form or bookings table based on user action */}
        <div className="col-lg-8 pb-5">
          {showSettingsForm && (
            <div className="event-details" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '50px', width: '500px', borderRadius: '15px' }}>
              <h2>Profile Settings</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input className="form-control" type="text" id="firstName" value={userDetails.firstName} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input className="form-control" type="text" id="lastName" value={userDetails.lastName} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-mail Address</label>
                  <input className="form-control" type="email" id="email" value={userDetails.email} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="mobileNumber">Phone Number</label>
                  <input className="form-control" type="text" id="mobileNumber" value={userDetails.mobileNumber} required />
                </div>
              </form>
            </div>
          )}

          {showBookingsTable && (
            <div className="row">
              {tickets.map(ticket => (
                <div className="col-lg-4" key={ticket.id}>
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5 className="card-title">Booking Id: {ticket.id}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Purchased Date & Time: {ticket.purchaseDateTime}</p>
                      <p className="card-text">Event Name: {ticket.event.name}</p>
                      <p className="card-text">Event Date: {ticket.event.eventDate}</p>
                      <p className="card-text">Event Time: {ticket.event.eventTime}</p>
                      <p className="card-text">Event Location: {ticket.event.location}</p>
                      <p className="card-text">Ticket Type: {ticket.ticketType}</p>
                      <p className="card-text">Count: {ticket.count}</p>
                      <p className="card-text">Price: {`${ticket.price}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
