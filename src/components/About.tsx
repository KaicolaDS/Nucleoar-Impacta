import React from 'react';
import { motion } from 'motion/react';
import { Users, Award, Clock, Globe, ArrowRight } from 'lucide-react';

import '../css/About.css';

const stats = [
  {
    label: 'Anos de Experiência',
    value: '20+',
    icon: Clock,
  },
  {
    label: 'Projetos Concluídos',
    value: '2.5k',
    icon: Award,
  },
  {
    label: 'Clientes Satisfeitos',
    value: '1.2k',
    icon: Users,
  },
  {
    label: 'Cidades Atendidas',
    value: '45',
    icon: Globe,
  },
];

export default function About() {
  return (
    <section id="about" className="about">
      {/* Background */}
      <div className="aboutBackground">
        <div className="aboutBlur aboutBlurPrimary" />
        <div className="aboutBlur aboutBlurSecondary" />
      </div>

      <div className="aboutContainer sectionContainer">
        {/* TITLE */}
        <motion.div
          className="containerTitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {' '}
          <img
            src="./img/logo/iconColorida.png"
            alt="logo"
            className="nucleoarLogo rotatingLogo"
          />
          <span className="sectionHeaderCentralize" id="inicialSection">
            <span className="line" />
            <span className="sectionTag">SOBRE</span>
            <span className="line" />
          </span>
          <h3 className="aboutTitle">
            Conheça a<span> Núcleoar </span>
          </h3>
          <div
            className="titleDividerCentralize"
            id="titleDividerCentralizeSection"
          />
        </motion.div>

        {/* GRID */}
        <div className="aboutGrid">
          {/* LEFT */}
          {/* LEFT */}
          <motion.div
            className="aboutContent"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aboutTitleContainer">
              <h3 className="aboutTitle">
                Mais de 20 anos entregando
                <span> excelência em climatização </span>e refrigeração.
              </h3>
            </div>

            <p className="aboutDescription">
              Fundada em 2002, a Núcleo Ar nasceu com o propósito de transformar
              o padrão dos serviços de climatização e refrigeração, oferecendo
              soluções eficientes, seguras e de alta qualidade para empresas e
              residências. Com sede própria e uma equipe altamente qualificada,
              atuamos com instalação, manutenção preventiva e corretiva, além de
              projetos completos de ar condicionado e sistemas de refrigeração.
              <br />
              <br />
              Nosso compromisso vai além da parte técnica: buscamos proporcionar
              conforto, bem-estar e confiança em cada atendimento. Trabalhamos
              com processos organizados, inovação constante e foco total na
              satisfação dos nossos clientes, sempre seguindo rigorosamente as
              normas técnicas e ambientais do setor.
            </p>

            {/* MISSÃO VISÃO VALORES */}
            <div className="aboutMissaoVisaoValores">
    
                Conheça nossa história <ArrowRight />
           
            </div>
            <div className="aboutFeatures">{/* FEATURES */}</div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="aboutImageWrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="aboutImageContainer">
              <img
                src="./img/nucleoar/tecnico.jpg"
                alt="Equipe Núcleo Ar"
                className="aboutImage"
              />

              <div className="aboutImageOverlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
