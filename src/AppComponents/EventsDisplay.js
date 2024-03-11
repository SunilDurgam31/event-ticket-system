import React, { useState, useEffect } from 'react';
import './EventsDisplay.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EventsDisplay() {
    const [showEventsTable, setShowEventsTable] = useState(false);
    
    const viewEvents = () => {
        setShowEventsTable(true);
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="sidebar-sticky">
                <button type="button" class="btn btn-outline-info" onClick={viewEvents}>View Events</button>
            </div>
            <div className="content">
                {showEventsTable && <EventsTable />}
            </div>
        </div>
    );
}

function Navbar() {
    const [input,setInput]=useState("")
    const fetchData=(value)=>{
        fetch("http://jsonplaceholder.typicode.com/users");
    }
    const handleChange=(value)=>{
        setInput(value);
        fetchData(value);
    };
    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="logo">
                <h2>Event List</h2>
            </div>

        <ul class="navbar-nav mx-auto">
        <li class="nav-item">
        <a class="nav-link" >Keyword Search</a>
        <div className='Search-bar-container'>
            <input placeholder='Type to search' value={input} onChange={(e)=>handleChange(e.target.value)}/>
        </div>
        
      </li>
      
    </ul> 
            <ul className="nav-links ml-auto">
                <li class="nav-item"><a class="nav-link" href="/Home">Home</a></li>
            </ul>
        </nav>
    );
}

function EventsTable() {
    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events data when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/upcoming-events/{eventId}');
                if (response.status === 200) {
                    setEvents(response.data);
                    
                } else {
                    alert('Failed to fetch events. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                
            }
        };

        fetchData(); 
    }, []);

    
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Date&Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map(user => (
                    <tr key={events.id}>
                        <td>{events.id}</td>
                        <td>{events.name}</td>
                        <td>{events.location}</td>
                        <td>{events.dateTime}</td>
                        
                        <td>
                            <Link to="/ViewEvent">
                            <button type="button" class="btn btn-outline-primary">View Event</button>
                            </Link>
                            <Link to="/Booking">
                            <button type="button" class="btn btn-outline-warning" >Book Event</button>
                            </Link>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    );
}

export default EventsDisplay;
