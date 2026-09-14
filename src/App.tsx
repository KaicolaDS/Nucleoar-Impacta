import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Sponsors from './components/Sponsors';
import About from './components/About';
import Footer from './components/Footer';
import Locations from './components/locations';
import Adm from './components/adm/Adm';

export default function App() {
  // Verifica se estamos na área administrativa
  const isAdmin = window.location.pathname.startsWith('/admin');

  // Se estiver no painel administrativo, não carrega o site público
  if (isAdmin) {
    return <Adm />;
  }

  return <PublicSite />;
}

function PublicSite() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const targetId = anchor.getAttribute('href');

      if (!targetId || targetId === '#' || !targetId.startsWith('#')) {
        return;
      }

      e.preventDefault();

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-500 selection:text-white">
      {/* Barra de progresso */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-brand-500"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Locations />
        <Sponsors />
        <About />
      </main>

      <Footer />
    </div>
  );
}