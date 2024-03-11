import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './AppComponents/Login';
import Signup from './AppComponents/Signup';
import Home from './AppComponents/Home';
import EventsDisplay from './AppComponents/EventsDisplay';
import Settings from './AppComponents/Settings';
import UserDashboard from './AppComponents/UserDashboard';
import ViewEvent from './AppComponents/ViewEvent';
import BookEvent from './AppComponents/BookEvent';
import TicketSummary from './AppComponents/TicketSummary';
import Payment from './AppComponents/Payment';
import CreditCard from './AppComponents/CreditCard';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Home' element={<Home />} />
          
          <Route path="/ViewEvent/:eventId" element={<ViewEvent />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path="/BookEvent/:eventId" element={<BookEvent />} />
          <Route path='/UserDashboard' element={<UserDashboard />} />
          <Route path='/TicketSummary' element={<TicketSummary />} />
          <Route path='/EventsDisplay' element={<EventsDisplay />} />
         <Route path='/Payment' element={<Payment/>}/>
         <Route path='/Card' element={<CreditCard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
