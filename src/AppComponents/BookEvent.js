import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/book.webp'; // Import the background image

const BookEvent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { eventDetails, userDetails } = state;
  const [ticketType, setTicketType] = useState('Choose');
  const [count, setCount] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  const additionalFees = 60;
  const gst = 60;

  const handleConfirmBooking = async () => {
    navigate(`/TicketSummary`);
    try {
      
      const totalPrice = eventDetails.ticketPrice * count + additionalFees + gst;
     
      const bookingData = {
        event: { id: eventDetails.id },
        register: { id: userDetails.id },
        ticketType: ticketType,
        price: totalPrice,
        count: count
        
      };

      const bookingResponse = await axios.post('http://localhost:8081/api/events/purchases', bookingData);

      console.log('Booking response:', bookingResponse); // Add this line for debugging

      if (bookingResponse.status === 201) {
        // navigate(`/TicketSummary`);
       alert.setBookingStatus('Booking successful!');
        const bookingDetails = {
          eventName: eventDetails.name,
          eventTime: eventDetails.eventTime,
          eventDate: eventDetails.eventDate,
          location: eventDetails.location,
          ticketType: ticketType,
          price: totalPrice,
          // Add more properties as needed
        };

        // Store bookingDetails in local storage
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Redirect to TicketSummary page after a delay of 500 milliseconds
        setTimeout(() => {
          window.location.href = '/TicketSummary';
        }, 500);
      } else {
        setBookingStatus('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error booking tickets:', error);
      setBookingStatus('Booking failed. Please try again.');
    }
  };

  const handleProceedToPay = () => {
    if (paymentMethod) {
      // Proceed to payment page based on selected payment method
      if (paymentMethod === 'choose') {
    
        window.location.href = '/Payment';
      }
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="event-details" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        {/* Left side */}
        <div style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Event Details</h3>
          <table style={{ width: '100%' }}>
            <tbody>
            <tr>
                <td><strong>Event Name:</strong></td>
                <td>{eventDetails.name}</td>
              </tr>
              <tr>
                <td><strong>Event Time:</strong></td>
                <td>{eventDetails.eventTime}</td>
              </tr>
              <tr>
                <td><strong>Event Date:</strong></td>
                <td>{eventDetails.eventDate}</td>
              </tr>
              <tr>
                <td><strong>Location:</strong></td>
                <td>{eventDetails.location}</td>
              </tr>
              <tr>
                <td><strong>Category:</strong></td>
                <td>{eventDetails.category.name}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{eventDetails.description}</td>
              </tr>
            </tbody>
            
          </table>
          {/* Ticket type and count selection */}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <label htmlFor="ticketType" style={{ marginRight: '10px' }}>Ticket Type:</label>
              <select id="ticketType" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                <option value="Choose">Choose</option>
                <option value="General">General</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
              </select>
            </div>
            <div>
              <label htmlFor="count" style={{ marginRight: '10px' }}>Ticket Count:</label>
              <input type="number" id="count" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
            </div>
            
          </div>
          <button onClick={handleConfirmBooking} style={{ marginTop: '20px', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Confirm Booking</button>
        </div>
        {/* Right side */}
        <div style={{ width: '40%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', borderRadius: '10px' }}>
  <div style={{ marginTop: '20px' }}>
    <h3>Booking Details:</h3>
    <table>
      <tbody>
        <tr>
          <td><strong>Ticket Type:</strong></td>
          <td>{ticketType}</td>
        </tr>
        <tr>
          <td><strong>Ticket Count:</strong></td>
          <td>{count}</td>
        </tr>
        <tr>
          <td><strong>Pricing Details:</strong></td>
          <td>
            <table>
              <tbody>
                <tr>
                  <td><strong>Ticket Price:</strong></td>
                  <td>{eventDetails.ticketPrice}</td>
                </tr>
                <tr>
                  <td><strong>Additional Fees:</strong></td>
                  <td>{additionalFees}</td>
                </tr>
                <tr>
                  <td><strong>GST:</strong></td>
                  <td>{gst}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td><strong>Total Price:</strong></td>
          <td>{eventDetails.ticketPrice * count + additionalFees + gst}</td>
        </tr>
      </tbody>
    </table>
  </div>
  {/* Payment method selection dropdown */}
  <div style={{ marginTop: '20px' }}>
    <label htmlFor="paymentMethod">Select Payment Method:</label>
    <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
      <option value="">Select Payment Method</option>
      <option value="choose">Choose</option>
     
     
      {/* Add more payment methods as needed */}
    </select>
  </div>
  {/* Proceed to Pay button */}
  <button onClick={handleProceedToPay} style={{ marginTop: '20px', backgroundColor: '#28a745', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Proceed to Pay</button>
</div>
</div>
</div>
  );
}
export default BookEvent;
