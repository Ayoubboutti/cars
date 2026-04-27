import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBox from './components/SearchBox';
import CarsSection from './components/CarsSection';
import WhyChooseUs from './components/WhyChooseUs';
import OffersSection from './components/OffersSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Booking from './pages/Booking';

function HomePage() {
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = ({ city }) => {
    setSearchCity(city || '');
  };

  return (
    <>
      <Hero />
      <SearchBox onSearch={handleSearch} />
      <CarsSection searchCity={searchCity} />
      <WhyChooseUs />
      <OffersSection />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
