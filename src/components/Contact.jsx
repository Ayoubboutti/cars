import { useState } from 'react';
import { Phone, MapPin, MessageCircle, Send, User, MessageSquare, CheckCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const contactInfo = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+212 600 123 456',
    href: 'https://wa.me/212600123456',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+212 522 123 456',
    href: 'tel:+212522123456',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'Bd Mohammed V, Casablanca',
    href: '#',
    color: 'from-primary to-amber-400',
  },
];

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-dark-800/30 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Contactez-nous
          </span>
          <h2 className="section-title mt-3">
            Besoin d'<span className="text-gradient">Aide</span> ?
          </h2>
          <p className="section-subtitle mt-4">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Nos coordonnées
            </h3>

            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 glass-card p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-x-1"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${info.color} p-0.5 shrink-0`}
                  >
                    <div className="w-full h-full bg-dark-700 rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="text-white font-semibold group-hover:text-primary transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              );
            })}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/212600123456"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              Discuter sur WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="glass-card gradient-border p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Envoyez-nous un message
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Message envoyé !</h4>
                  <p className="text-gray-400">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                      <User className="w-4 h-4 text-primary" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className="input-field"
                    />
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
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+212 6XX XXX XXX"
                      className="input-field"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Votre message..."
                      className="input-field resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
