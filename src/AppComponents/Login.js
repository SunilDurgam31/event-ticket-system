import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import yourImage from '../images/party.avif';
import eventBackground from '../images/party.jpg';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post('http://localhost:8081/api/events/login', {
        emailOrMobileNumber: email,
        password: password,
      });

      if (response.status === 200) {
        console.log('Login Successful:', JSON.stringify(response.data));
        // Store user's email in localStorage
        localStorage.setItem('userEmail', email);
        navigate('/Home');// Navigate to settings page
      } else {
        console.log('Login Unsuccessful:', response.status, response.data);
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error(error);
      alert('Invalid Credentials');
    }
  };

  const validateEmail = () => {
    const regEx = /^[a-zA-z0-9._]+@[a-z]+\.[a-z]{2,6}$/;
    if (!regEx.test(email)) {
      setMessage('Please Enter a Valid Email');
    } else {
      setMessage('');
    }
  };

  return (
    <section
    className="vh-100"
    style={{
      backgroundImage: `url(${eventBackground})`, // Apply background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block" style={{ padding: '15px' }}>
              <img
                src={yourImage}
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: '1rem 0rem 50rem 1rem' }}
              />
            </div>

                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <h2>Event Ticket System</h2>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="email"
                          className="form-control form-control-lg"
                          value={email}
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={validateEmail}
                          required
                        />
                        <label className="form-label" htmlFor="email">Email address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="form-control form-control-lg"
                          value={password}
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="showPassword"
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                          View Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                        {error && <div className="text-danger">{error}</div>}
                        <a className="small text-muted" href="#!">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account? <a href="/signup" style={{ color: '#393f81' }}>Register here</a>
                        </p>
                        
                      </div>
                    </form>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
