import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  CalendarDays,
  Car,
  Clock,
  CreditCard,
  CheckCircle,
  Sparkles,
  Shield,
  AlertCircle,
} from 'lucide-react';

const cityOptions = ['Casablanca', 'Marrakech', 'Tanger', 'Agadir'];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    pickupDate: '',
    returnDate: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState(null);

  // Redirect to home if no car data
  if (!car) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="glass-card gradient-border p-10 text-center max-w-md w-full animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Aucune voiture sélectionnée</h2>
          <p className="text-gray-400 mb-8">
            Veuillez d'abord choisir une voiture depuis notre catalogue.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voir les voitures
          </button>
        </div>
      </div>
    );
  }

  // Calculate days & total price
  const { days, totalPrice } = useMemo(() => {
    if (!form.pickupDate || !form.returnDate) return { days: 0, totalPrice: 0 };
    const start = new Date(form.pickupDate);
    const end = new Date(form.returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const d = diff > 0 ? diff : 0;
    return { days: d, totalPrice: d * car.price };
  }, [form.pickupDate, form.returnDate, car.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Le nom est requis';
    if (!form.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    else if (!/^[\d+\s()-]{8,}$/.test(form.phone.trim()))
      newErrors.phone = 'Numéro invalide';
    if (!form.city) newErrors.city = 'La ville est requise';
    if (!form.pickupDate) newErrors.pickupDate = 'La date est requise';
    if (!form.returnDate) newErrors.returnDate = 'La date est requise';
    else if (days <= 0) newErrors.returnDate = 'La date de retour doit être après la date de retrait';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const bookingData = {
      id: `BK-${Date.now().toString(36).toUpperCase()}`,
      car: { name: car.name, price: car.price, image: car.image, category: car.category },
      ...form,
      days,
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('autorent_bookings') || '[]');
    existing.push(bookingData);
    localStorage.setItem('autorent_bookings', JSON.stringify(existing));

    setBooking(bookingData);
    setSubmitted(true);
  };

  // Today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Success state
  if (submitted && booking) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-32">
        <div className="glass-card gradient-border p-8 md:p-12 max-w-lg w-full text-center animate-fade-in-up">
          {/* Success Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Réservation confirmée !
          </h2>
          <p className="text-gray-400 mb-8">
            Votre réservation a été enregistrée avec succès.
          </p>

          {/* Booking Summary Card */}
          <div className="bg-dark-600/50 rounded-2xl p-6 text-left space-y-4 mb-8 border border-dark-400/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Réf.</span>
              <span className="text-primary font-mono font-bold">{booking.id}</span>
            </div>
            <div className="border-t border-dark-400/20" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Voiture</span>
              <span className="text-white font-medium">{booking.car.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Client</span>
              <span className="text-white">{booking.fullName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Ville</span>
              <span className="text-white">{booking.city}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Durée</span>
              <span className="text-white">{booking.days} jour{booking.days > 1 ? 's' : ''}</span>
            </div>
            <div className="border-t border-dark-400/20" />
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-primary">{booking.totalPrice} DH</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 btn-outline flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <a
              href={`https://wa.me/212600123456?text=${encodeURIComponent(
                `Bonjour, je confirme ma réservation:\nRéf: ${booking.id}\nVoiture: ${booking.car.name}\nVille: ${booking.city}\nDu ${booking.pickupDate} au ${booking.returnDate}\nTotal: ${booking.totalPrice} DH`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-28 pb-16 px-4">
      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-primary/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Retour aux voitures</span>
        </button>

        {/* Page Title */}
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Réservation</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Finaliser votre <span className="text-gradient">réservation</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
            {/* Selected Car Card */}
            <div className="glass-card gradient-border overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-56 h-44 sm:h-auto shrink-0 relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-700/80 hidden sm:block" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary/70 uppercase tracking-wider mb-1">
                    {car.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{car.fuel}</span>
                    <span className="w-1 h-1 bg-dark-400 rounded-full" />
                    <span>{car.transmission}</span>
                    <span className="w-1 h-1 bg-dark-400 rounded-full" />
                    <span>{car.seats} places</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">{car.price}</span>
                    <span className="text-sm text-gray-500">DH/jour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="glass-card gradient-border p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Informations de réservation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <User className="w-4 h-4 text-primary" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    className={`input-field ${errors.fullName ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <Phone className="w-4 h-4 text-primary" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+212 6XX XXX XXX"
                    className={`input-field ${errors.phone ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <MapPin className="w-4 h-4 text-primary" />
                    Ville de retrait
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={`input-field appearance-none cursor-pointer ${errors.city ? 'border-red-500/50' : ''}`}
                  >
                    <option value="">Choisir une ville</option>
                    {cityOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>

                {/* Pickup Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Date de retrait
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={form.pickupDate}
                    onChange={handleChange}
                    min={today}
                    className={`input-field ${errors.pickupDate ? 'border-red-500/50' : ''}`}
                  />
                  {errors.pickupDate && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.pickupDate}
                    </p>
                  )}
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Date de retour
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={form.returnDate}
                    onChange={handleChange}
                    min={form.pickupDate || today}
                    className={`input-field ${errors.returnDate ? 'border-red-500/50' : ''}`}
                  />
                  {errors.returnDate && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.returnDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit (visible on mobile only, desktop uses sidebar) */}
              <div className="mt-8 lg:hidden">
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base">
                  <CheckCircle className="w-5 h-5" />
                  Confirmer la réservation
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Price Summary Sidebar */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card gradient-border p-6 sticky top-28">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Récapitulatif
              </h3>

              <div className="space-y-4 mb-6">
                {/* Car */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary/60" />
                    Voiture
                  </span>
                  <span className="text-sm font-medium text-white">{car.name}</span>
                </div>

                {/* Price/day */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary/60" />
                    Prix/jour
                  </span>
                  <span className="text-sm font-medium text-white">{car.price} DH</span>
                </div>

                {/* Days */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary/60" />
                    Durée
                  </span>
                  <span className="text-sm font-medium text-white">
                    {days > 0 ? `${days} jour${days > 1 ? 's' : ''}` : '—'}
                  </span>
                </div>

                <div className="border-t border-dark-400/30 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">Total</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary">
                        {totalPrice > 0 ? totalPrice : '—'}
                      </span>
                      {totalPrice > 0 && <span className="text-sm text-gray-500 ml-1">DH</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-3 mb-6 pt-4 border-t border-dark-400/30">
                {[
                  'Annulation gratuite 24h',
                  'Assurance incluse',
                  'Kilométrage illimité',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4 text-green-400/70 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Submit Button (desktop) */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={days <= 0}
                className="hidden lg:flex w-full btn-primary items-center justify-center gap-2 py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <CheckCircle className="w-5 h-5" />
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
