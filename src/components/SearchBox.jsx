import { useState } from 'react';
import { Search, MapPin, CalendarDays } from 'lucide-react';

const cityOptions = ['Casablanca', 'Marrakech', 'Tanger', 'Agadir'];

export default function SearchBox({ onSearch }) {
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ city, startDate, endDate });
    // Scroll to cars
    document.getElementById('voitures')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="search" className="relative z-10 -mt-12 mb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="glass-card gradient-border p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* City */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <MapPin className="w-4 h-4 text-primary" />
                Ville
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field appearance-none cursor-pointer"
              >
                <option value="">Toutes les villes</option>
                {cityOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <CalendarDays className="w-4 h-4 text-primary" />
                Date début
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                <CalendarDays className="w-4 h-4 text-primary" />
                Date fin
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 h-[50px]"
            >
              <Search className="w-5 h-5" />
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
