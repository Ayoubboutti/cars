import { Clock, Calendar, Percent, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const offers = [
  {
    id: 1,
    title: 'Offre Weekend',
    subtitle: 'Vendredi → Dimanche',
    description: 'Profitez de nos prix réduits pour le weekend. Réservez une voiture économique pour seulement 350 DH le weekend complet.',
    price: '350',
    originalPrice: '450',
    unit: 'DH/weekend',
    icon: Calendar,
    gradient: 'from-primary via-yellow-400 to-amber-500',
    bgGradient: 'from-primary/10 to-amber-500/5',
    badge: '-22%',
  },
  {
    id: 2,
    title: 'Pack 3 Jours',
    subtitle: 'Location flexible',
    description: 'Louez pendant 3 jours consécutifs et bénéficiez d\'une réduction spéciale. Idéal pour les courts séjours au Maroc.',
    price: '400',
    originalPrice: '540',
    unit: 'DH/3 jours',
    icon: Clock,
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    bgGradient: 'from-purple-500/10 to-indigo-500/5',
    badge: '-26%',
  },
  {
    id: 3,
    title: 'Offre Longue Durée',
    subtitle: '7 jours ou plus',
    description: 'Pour les longs séjours, bénéficiez de tarifs dégressifs exceptionnels. Plus vous louez longtemps, plus vous économisez.',
    price: '120',
    originalPrice: '150',
    unit: 'DH/jour',
    icon: Percent,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
    badge: '-20%',
  },
];

export default function OffersSection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="offres" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Promotions
          </span>
          <h2 className="section-title mt-3">
            Offres <span className="text-gradient">Spéciales</span>
          </h2>
          <p className="section-subtitle mt-4">
            Profitez de nos offres exclusives pour économiser sur votre location
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`group relative glass-card overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${offer.gradient}`} />

                {/* Background glow */}
                <div
                  className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${offer.bgGradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div className="relative p-7">
                  {/* Badge */}
                  <span
                    className={`absolute top-6 right-6 bg-gradient-to-r ${offer.gradient} text-dark-900 text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    {offer.badge}
                  </span>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${offer.gradient} p-0.5 mb-5`}
                  >
                    <div className="w-full h-full bg-dark-700 rounded-2xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-primary/70 font-medium mb-3">{offer.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {offer.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-white">{offer.price}</span>
                    <span className="text-sm text-gray-500">{offer.unit}</span>
                    <span className="text-sm text-gray-600 line-through ml-auto">
                      {offer.originalPrice} DH
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="w-full btn-primary flex items-center justify-center gap-2 group/btn">
                    En profiter
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
