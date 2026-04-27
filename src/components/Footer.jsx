import { Car, Facebook, Instagram, Twitter, Youtube, ArrowUp, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Accueil', href: '#accueil' },
      { name: 'Voitures', href: '#voitures' },
      { name: 'Offres', href: '#offres' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Catégories',
    links: [
      { name: 'Économique', href: '#voitures' },
      { name: 'Confort', href: '#voitures' },
      { name: 'Luxe', href: '#voitures' },
      { name: 'SUV', href: '#voitures' },
    ],
  },
  {
    title: 'Villes',
    links: [
      { name: 'Casablanca', href: '#voitures' },
      { name: 'Marrakech', href: '#voitures' },
      { name: 'Tanger', href: '#voitures' },
      { name: 'Agadir', href: '#voitures' },
    ],
  },
];

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-800 border-t border-dark-400/20 relative">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#accueil" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-dark-900" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  Auto<span className="text-primary">Rent</span>
                </span>
                <span className="block text-[10px] text-gray-400 -mt-1 tracking-widest uppercase">
                  Maroc
                </span>
              </div>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              Votre partenaire de confiance pour la location de voitures au Maroc.
              Des véhicules de qualité à des prix imbattables dans toutes les grandes villes.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-dark-600/50 border border-dark-400/20 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-primary text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} AutoRent Maroc. Fait avec
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            au Maroc
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-dark-600/50 border border-dark-400/20 rounded-xl flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
