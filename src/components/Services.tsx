import React from 'react';
import { motion } from 'motion/react';
import {
  BadgeCheck,
  ToolCase,
  FileCheck,
  Sparkles,
  Clock3,
  Wrench,
  Handshake,
  Award,
  type LucideIcon,
} from 'lucide-react';

import '../css/Services.css';

const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: BadgeCheck,
    title: 'Instalação Especializada',
    description:
      'Instalação profissional para ambientes residenciais, comerciais e industriais.',
  },
  {
    icon: Wrench,
    title: 'Manutenção Preventiva',
    description:
      'Higienização, calibragem e inspeções periódicas para maior desempenho.',
  },
  {
    icon: ToolCase,
    title: 'Manutenção Corretiva',
    description:
      'Diagnóstico rápido e soluções eficientes para falhas em equipamentos.',
  },
  {
    icon: FileCheck,
    title: 'PMOC e Relatórios',
    description:
      'Implantação de PMOC com relatórios técnicos completos e digitais.',
  },
  {
    icon: Handshake,
    title: 'Contratos Personalizados',
    description:
      'Planos flexíveis de manutenção adaptados para cada necessidade.',
  },
  {
    icon: Sparkles,
    title: 'Higienização Completa',
    description:
      'Limpeza e desbacterização para melhorar a qualidade do ar.',
  },
  {
    icon: Clock3,
    title: 'Atendimento Rápido',
    description:
      'Assistência técnica ágil com suporte especializado em até 24h.',
  },
  {
    icon: Award,
    title: 'Sistemas Avançados',
    description:
      'Atendimento para Split, VRF, VRV, Chiller e centrais de ar.',
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="servicesContainer sectionContainer">
        <motion.div
          className="containerTitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="./img/logo/iconColorida.png"
            alt="Núcleo Ar"
            className="nucleoarLogo rotatingLogo"
          />

          <span className="sectionHeaderCentralize">
            <span className="line" />
            <span className="sectionTag">Serviços</span>
            <span className="line" />
          </span>

          <h2 className="sectionTitle">
            Soluções completas em
            <span> climatização </span>
          </h2>

          <div className="titleDividerCentralize" />
        </motion.div>

        <motion.div
          className="servicesGrid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article className="serviceCard" key={title}>
              <div className="serviceIconWrapper">
                <Icon className="serviceIcon" />
              </div>
              <div className="serviceContent">
                <h3 className="serviceTitle">{title}</h3>
                <p className="serviceText">{description}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
