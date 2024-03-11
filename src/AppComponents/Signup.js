import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import eventBackground from '../images/register.jpg';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [spassword, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRPassword, setHideRPassword] = useState(true);

  async function save(event) {
    try {
      if (event) {
        event.preventDefault();
      }
  
      await axios.post('http://localhost:8081/api/events/register', {
        id: null,
        city: city,
        country: country,
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        password: spassword,
        pincode: pincode,
        state: state,
        addressLine: addressLine,
        landmark: landmark,
        gender: gender
      });
  
      alert('Registered');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }
  }
  
  

  const register = () => {
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !gender||
      !email ||
      !addressLine||
      !landmark||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !spassword ||
      !rpassword
    ) {
      alert('All fields are required');
    } else if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
    } else if (!/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/.test(email)) {
      alert('Please enter a valid email address');
    } else if (! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(spassword)) {
      alert('Password must contain at least 8 characters');
    } else if (spassword !== rpassword) {
      alert('Passwords not matching');
    } else {
      console.log('Registration data:', {
        firstName,
        lastName,
        mobileNumber,
        email,
        city,
        state,
        country,
        pincode,
        spassword,
        rpassword,
      });
      save();
    }
  };

  return (
    <div
    className="container mt-5"
    style={{
      backgroundImage: `url(${eventBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
      <div className="row">
      <h3 className="mb-4" style={{color:'white'}}>USER REGISTRATION PAGE  </h3>

      <div style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', borderRadius: '10px' }}>
          <div className="card p-4">
           
            <form>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <input type="text" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="addressLine" className="form-label">Address Line</label>
                <input type="text" className="form-control" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="landmark" className="form-label">Landmark</label>
                <input type="text" className="form-control" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
              </div>
            </form>
          </div>
        </div>
        <div style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black', padding: '20px', borderRadius: '10px' }}>
          <div className="card p-4">
           
            <form>
              
              <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="spassword" className="form-label">Set Password</label>
                <div className="input-group">
                  <input
                    type={hidePassword ? 'password' : 'text'}
                    className="form-control"
                    value={spassword}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="rpassword" className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={hideRPassword ? 'password' : 'text'}
                    className="form-control"
                    value={rpassword}
                    onChange={(e) => setRPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setHideRPassword(!hideRPassword)}
                  >
                    {hideRPassword ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>
              <div>
              <button type="button" className="btn btn-dark" onClick={register}>Register</button>

              </div>
             
              <p className="text-end mt-2">Already have an account?
                <Link to="/" className="ms-2">Login</Link>
              </p>
             
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
