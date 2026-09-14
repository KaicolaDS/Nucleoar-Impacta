import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../css/Hero.css';
import { FaWhatsapp } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="hero">
      <div className="heroContainer">
        <motion.div className="heroLeft">
          <h1 className="heroTitle">
            <img src="./img/logo/logoBranco.png" alt="Núcleo Ar" />
          </h1>

          <p className="heroDescription">
            Especialistas em soluções completas de climatização,
            refrigeração e qualidade do ar para ambientes comerciais,
            industriais e residenciais.
          </p>

          <div className="heroButtons">
            <a href="#services" className="heroBtnPrimary">
              Faça um Orçamento <FaWhatsapp size={25} />
            </a>

            <a href="#locations" className="heroBtnSecondary">
              Onde Atendemos <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div className="heroRight">
          <div className="heroImageContainer">
            <div className="heroImageWrap">
              <img
                src="./img/features/imgAirconditioning.png"
                alt="Ar Condicionado"
                className="heroImageSupport"
              />
              <div className="heroAirEffect" aria-hidden="true" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
