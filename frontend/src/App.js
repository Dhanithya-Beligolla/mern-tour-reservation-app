import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import PackageList from './components/PackageList';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import BookingList from './components/BookingList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PackageList />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/bookings" element={<BookingList />} />
      </Routes>
    </Router>
  );
}

export default App;
