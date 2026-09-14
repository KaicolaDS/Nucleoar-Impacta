import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Empresa', href: '#empresa' },
  { name: 'Contato', href: '#contato' },
];

const services = [
  { name: 'Instalação de Ar-Condicionado', href: '#instalacao' },
  { name: 'Manutenção Preventiva', href: '#manutencao' },
  { name: 'Manutenção Corretiva', href: '#corretiva' },
  { name: 'Higienização', href: '#higienizacao' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex h-16 items-center justify-between rounded-2xl bg-white/95 px-5 shadow-lg backdrop-blur-md">

          {/* LOGO */}
          <a
            href="#inicio"
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
              <span className="text-xl font-black text-white">
                N
              </span>
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-gray-900">
                NÚCLEAR
              </span>

              <span className="text-[9px] font-semibold tracking-[0.25em] text-gray-500">
                CLIMATIZAÇÃO
              </span>
            </div>
          </a>

          {/* MENU DESKTOP */}
          <div className="hidden items-center gap-8 md:flex">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-700 transition-colors hover:text-brand-500"
              >
                {link.name}
              </a>
            ))}

            {/* DROPDOWN SERVIÇOS */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-brand-500"
              >
                Serviços
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-xl bg-white p-2 shadow-xl"
                  >
                    {services.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-500"
                      >
                        {service.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* BOTÃO ADMIN DESKTOP */}
          <div className="hidden md:block">
            <a
              href="/admin"
              className="WhatsappButton"
            >
              Painel Administrativo
            </a>
          </div>

          {/* BOTÃO MENU MOBILE */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-800 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* MENU MOBILE */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 overflow-hidden rounded-2xl bg-white shadow-xl md:hidden"
            >
              <div className="flex flex-col p-4">

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

                {/* SERVIÇOS MOBILE */}
                <button
                  type="button"
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span>Serviços</span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 border-l border-gray-200 pl-3">
                        {services.map((service) => (
                          <a
                            key={service.name}
                            href={service.href}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsServicesOpen(false);
                            }}
                          >
                            {service.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOTÃO ADMIN MOBILE */}
                <a
                  href="/admin"
                  className="mobileWhatsappButton mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Painel Administrativo
                </a>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}