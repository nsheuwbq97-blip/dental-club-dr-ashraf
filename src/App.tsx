import { useEffect, useState } from 'react';
import { DEFAULT_PROPOSED_SERVICES, ServiceCategory } from './data/clinicData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'dental_club_proposed_services_v1';

export default function App() {
  const [services, setServices] = useState<ServiceCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ServiceCategory[];
        if (Array.isArray(parsed) && parsed.length === DEFAULT_PROPOSED_SERVICES.length) {
          return parsed;
        }
      }
    } catch {
      // Fall back to default proposed categories if storage is unavailable
    }
    return DEFAULT_PROPOSED_SERVICES;
  });

  const [preselectedService, setPreselectedService] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch {
      // Ignore storage quota errors
    }
  }, [services]);

  const scrollToAppointment = () => {
    const target = document.getElementById('appointment');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToAppointment();
  };

  const handleUpdateService = (id: string, title: string, description: string) => {
    setServices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title, description } : item))
    );
  };

  const handleResetServices = () => {
    setServices(DEFAULT_PROPOSED_SERVICES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#12304A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#12304A] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar onBookClick={scrollToAppointment} />

      <main id="main-content" className="flex-1">
        <HeroSection onBookClick={scrollToAppointment} />
        <AboutSection onBookClick={scrollToAppointment} />
        <ServicesSection
          services={services}
          onUpdateService={handleUpdateService}
          onResetServices={handleResetServices}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />
        <WhyChooseUsSection />
        <ReviewsSection />
        <AppointmentSection
          services={services}
          preselectedService={preselectedService}
        />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
