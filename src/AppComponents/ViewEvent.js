import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import musicImage from '../images/musics.jpg';
import movieImage from '../images/Movie.jpg';
import photoImage from '../images/Photo.webp';
import danceImage from '../images/dance.webp';
import circusImage from '../images/Circus.jpg';
import djImage from '../images/dj.jpg';
import holiImage from '../images/Holi.jpg';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import CSS for styling

const ViewEvent = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    fetchUserDetailsFromStorage(); 
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/events/upcoming-events/${eventId}`);

      if (response.status === 200) {
        const eventData = response.data;
        setEventDetails(eventData);
        
      } else {
        alert('Failed to fetch event details. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      alert('Failed to fetch event details. Please try again.');
    }
  };

  const fetchUserDetailsFromStorage = () => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const renderEventImage = () => {
    const categoryName = eventDetails.category.name.toLowerCase();
    switch (categoryName) {
      case 'music':
        return musicImage;
      case 'movie':
        return movieImage;
      case 'photo':
        return photoImage;
        case 'holi':
        return holiImage;
        case 'djnight':
        return djImage;
        case 'dance':
        return danceImage;
        case 'circus':
        return circusImage;
      default:
        return null; // Default image or no image
    }
  };

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh', display: 'flex' }}>
    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '20px', zIndex: '1' }}>
      <div className="event-details" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '50px', marginLeft: '150px', width: '500px', borderRadius: '15px' }}>
        <h2>{eventDetails.name}</h2>
        <table>
          <tbody>
            <tr>
              <td style={{ width: '120px' }}>Event Time:</td>
              <td>{eventDetails.eventTime}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{eventDetails.location}</td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>{eventDetails.category.name}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{eventDetails.description}</td>
            </tr>
          </tbody>
        </table>
        <Link to={`/BookEvent/${eventId}`} state={{ eventDetails, userDetails }} className="book-event-btn">Book Event</Link>
      </div>
    </div>
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '-1' }}>
      <img src={renderEventImage()} alt="Event Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </div>
  

   
  );
}

export default ViewEvent;
