import { useNavigate } from 'react-router-dom';
import { Fuel, Users, Settings, Tag } from 'lucide-react';

export default function CarCard({ car }) {
  const navigate = useNavigate();

  const badgeColors = {
    Populaire: 'bg-green-500/20 text-green-400 border-green-500/30',
    Premium: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Meilleur choix': 'bg-primary/20 text-primary border-primary/30',
  };

  const handleBook = () => {
    navigate('/booking', { state: { car } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="glass-card gradient-border group overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />

        {/* Badge */}
        {car.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${
              badgeColors[car.badge] || 'bg-primary/20 text-primary border-primary/30'
            }`}
          >
            {car.badge}
          </span>
        )}

        {/* Category */}
        <span className="absolute top-4 right-4 bg-dark-900/70 backdrop-blur-md text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-dark-400/30">
          {car.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
          {car.name}
        </h3>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Fuel className="w-4 h-4 text-primary/70" />
            {car.fuel}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Settings className="w-4 h-4 text-primary/70" />
            {car.transmission}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4 text-primary/70" />
            {car.seats} places
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Tag className="w-4 h-4 text-primary/70" />
            {car.city}
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-400/30">
          <div>
            <span className="text-2xl font-bold text-primary">{car.price}</span>
            <span className="text-sm text-gray-500 ml-1">DH/jour</span>
          </div>
          <button onClick={handleBook} className="btn-primary text-sm px-5 py-2.5">
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}
