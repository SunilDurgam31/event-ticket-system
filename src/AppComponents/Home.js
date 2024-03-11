import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/upcoming.png'; // Import your background image

function Home() {
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let url = 'http://localhost:8081/api/events/upcoming-events';
      let params = {};

      if (location) {
        url = 'http://localhost:8081/api/events/filter';
        params = { ...params, location };
      }
      if (categoryName) {
        url = 'http://localhost:8081/api/events/filter';
        params = { ...params, category: categoryName };
      }

      const response = await axios.get(url, { params });

      if (response.status === 200) {
        setEvents(response.data);
      } else {
        alert('Failed to fetch events. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events. Please try again.');
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, color: 'white', minHeight: '100vh', padding: '20px' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-brand">
          <h1>Events</h1>
        </div>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/UserDashboard">User Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <div>
       
        <select
          className="form-select"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        >
          <option value="">Select City</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        <select
          className="form-select"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Movie">Movie</option>
          <option value="Photo">Photo</option>
          <option value="Holi">Holi</option>
          <option value="DJNight">DJNight</option>
          <option value="Dance">Dance</option>
          <option value="circus">Circus</option>
          
        </select>

        <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>

        <h1></h1>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.eventDate}</td>
                <td>{event.eventTime}</td>
                <td>
                  <Link to={`/ViewEvent/${event.id}`}>
                    <button type="button" className="btn btn-outline-primary">View Event</button>
                  </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
