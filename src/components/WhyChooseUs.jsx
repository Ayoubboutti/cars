import { Shield, Banknote, Zap, Truck, Headphones } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const features = [
  {
    icon: Shield,
    title: 'Voitures de qualité',
    description: 'Une flotte récente et entretenue régulièrement pour votre sécurité et confort.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Banknote,
    title: 'Prix abordables',
    description: 'Les meilleurs tarifs du marché, à partir de 150 DH par jour sans frais cachés.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Zap,
    title: 'Réservation rapide',
    description: 'Réservez votre voiture en quelques clics via notre plateforme ou WhatsApp.',
    color: 'from-primary to-yellow-300',
  },
  {
    icon: Truck,
    title: 'Livraison disponible',
    description: 'Nous livrons la voiture à l\'aéroport, hôtel ou toute autre adresse au Maroc.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Notre équipe est disponible 24h/24 et 7j/7 pour vous assister à tout moment.',
    color: 'from-orange-500 to-red-400',
  },
];

export default function WhyChooseUs() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-24 bg-dark-800/30 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Nos Avantages
          </span>
          <h2 className="section-title mt-3">
            Pourquoi <span className="text-gradient">Nous Choisir</span> ?
          </h2>
          <p className="section-subtitle mt-4">
            Des services premium pour une expérience de location inoubliable
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group glass-card p-6 text-center hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                >
                  <div className="w-full h-full bg-dark-700 rounded-2xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
