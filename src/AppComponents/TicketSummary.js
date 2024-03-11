import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode.react';
import backgroundImage from '../images/event.jpg'; // Import the background image

const TicketSummary = ({ location }) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [qrCodeData, setQRCodeData] = useState('');

  useEffect(() => {
    const storedBookingDetails = localStorage.getItem('bookingDetails');
    if (storedBookingDetails) {
      setBookingDetails(JSON.parse(storedBookingDetails));
    }
  }, []);

  useEffect(() => {
    if (bookingDetails) {
      // Generate QR code data (e.g., booking details)
      const data = JSON.stringify(bookingDetails);
      setQRCodeData(data);
    }
  }, [bookingDetails]);

  return (
    <div className="container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '-1' }}>
        <img src={backgroundImage} alt="Event Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="confirmation-message" style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', color: 'green' }}>
        <h2>
          <FontAwesomeIcon icon={faCheckCircle} /> Booking Confirmed
        </h2>
      </div>
      <div className="booking-summary" style={{ position: 'absolute', bottom: '50px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
        {bookingDetails && (
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td><strong>Event Name:</strong></td>
                <td>{bookingDetails.eventName}</td>
                <td rowSpan="6">
                  <div className="qr-code" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                    <QRCode value={qrCodeData} />
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Event Time:</strong></td>
                <td>{bookingDetails.eventTime}</td>
              </tr>
              <tr>
                <td><strong>Event Date:</strong></td>
                <td>{bookingDetails.eventDate}</td>
              </tr>
              <tr>
                <td><strong>Event Location:</strong></td>
                <td>{bookingDetails.location}</td>
              </tr>
              <tr>
                <td><strong>Ticket Type:</strong></td>
                <td>{bookingDetails.ticketType}</td>
              </tr>
              <tr>
                <td><strong>Price:</strong></td>
                <td>${bookingDetails.price}</td>
              </tr>
              {/* Add more booking details as needed */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TicketSummary;
