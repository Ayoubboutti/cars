import { ChevronDown, MapPin, Sparkles } from 'lucide-react';

const cities = ['كازا', 'مراكش', 'طنجة', 'أكادير'];

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop"
          alt="Moroccan city skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(250,204,21,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(250,204,21,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              #1 Location de voitures au Maroc
            </span>
          </div>

          {/* Arabic Title */}
          <h1
            className="font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up"
            dir="rtl"
          >
            كراء السيارات
            <br />
            <span className="text-gradient">بسهولة فالمغرب</span>
          </h1>

          {/* Price subtitle */}
          <p
            className="font-arabic text-2xl sm:text-3xl text-gray-300 mb-4 animate-fade-in-up"
            dir="rtl"
            style={{ animationDelay: '0.2s' }}
          >
            من <span className="text-primary font-bold text-4xl">150</span> درهم لليوم
          </p>

          {/* Cities */}
          <div
            className="flex items-center gap-3 mb-10 flex-wrap animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            {cities.map((city, i) => (
              <span key={city} className="font-arabic text-lg text-gray-400 flex items-center gap-3">
                <span className="hover:text-primary transition-colors cursor-default">{city}</span>
                {i < cities.length - 1 && (
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full" />
                )}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="#voitures"
              className="btn-primary text-base px-8 py-4 font-arabic text-lg animate-pulse-glow"
            >
              شوف السيارات
            </a>
            <a
              href="#contact"
              className="btn-outline text-base px-8 py-4 font-arabic text-lg"
            >
              حجز دابا
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 mt-16 max-w-md animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            {[
              { value: '500+', label: 'Voitures' },
              { value: '10K+', label: 'Clients' },
              { value: '4.8', label: 'Rating ★' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#search" className="text-gray-500 hover:text-primary transition-colors">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
