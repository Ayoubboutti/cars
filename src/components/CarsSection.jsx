import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import CarCard from './CarCard';
import useScrollReveal from '../hooks/useScrollReveal';
import carsData, { cities, categories } from '../data/cars';

export default function CarsSection({ searchCity }) {
  const [selectedCity, setSelectedCity] = useState(searchCity || 'Toutes');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    if (searchCity) {
      setSelectedCity(searchCity);
    }
  }, [searchCity]);

  const filteredCars = carsData.filter((car) => {
    const cityMatch = selectedCity === 'Toutes' || car.city === selectedCity;
    const catMatch = selectedCategory === 'Toutes' || car.category === selectedCategory;
    return cityMatch && catMatch;
  });

  return (
    <section id="voitures" className="py-24 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Notre Flotte
          </span>
          <h2 className="section-title mt-3">
            Nos <span className="text-gradient">Voitures</span>
          </h2>
          <p className="section-subtitle mt-4">
            Découvrez notre large sélection de voitures pour tous vos besoins
          </p>
        </div>

        {/* Filters */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter className="w-4 h-4 text-primary" />
            Filtrer:
          </div>

          {/* City Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCity === city
                    ? 'bg-primary text-dark-900 shadow-lg shadow-primary/20'
                    : 'bg-dark-600/50 text-gray-400 hover:text-white hover:bg-dark-500/50 border border-dark-400/20'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <span className="hidden sm:block w-px h-6 bg-dark-400/30" />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-primary text-dark-900 shadow-lg shadow-primary/20'
                    : 'bg-dark-600/50 text-gray-400 hover:text-white hover:bg-dark-500/50 border border-dark-400/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Aucune voiture trouvée pour cette sélection.
            </p>
            <button
              onClick={() => {
                setSelectedCity('Toutes');
                setSelectedCategory('Toutes');
              }}
              className="btn-outline mt-4 text-sm"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
