import React from 'react';
import '../css/Sponsors.css';
import { motion } from 'motion/react';

export default function Sponsors() {
    return (
        <section className="trustedSection">

            <div className="trustedBackground" />

            <div className="trustedContainer sectionContainer">
        {/* TITLE */}
        <motion.div
          className="containerTitle"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >  <img
            src="./img/logo/iconColorida.png"
            alt="logo"
            className="nucleoarLogo rotatingLogo"
          />

          <span className="sectionHeaderCentralize" id='inicialSection'>
            <span className="line" />
            <span className="sectionTag">PARCEIROS</span>
            <span className="line" />

          </span>

          <h2 className="sectionTitle">
            Conheça os nossos
            <span> apoiadores </span>
          </h2>

          <div className="titleDividerCentralize" id='titleDividerCentralizeSection' />
        </motion.div>

                <div className="trustedSlider">

                    {[
                        {
                            name: 'ELGIN',
                            image: './img/sponsors/img_sponsor1.png',
                        },
                        {
                            name: 'fUJITSU',
                            image: './img/sponsors/img_sponsor2.png',
                        },
                        {
                            name: 'LG',
                            image: './img/sponsors/img_sponsor3.png',
                        },
                        {
                            name: 'Daikin',
                            image: './img/sponsors/img_sponsor4.png',
                        },
                        {
                            name: 'CARRIER',
                            image: './img/sponsors/img_sponsor5.png',
                        },
                        {
                            name: 'TRANE',
                            image: './img/sponsors/img_sponsor6.png',
                        },
                         {
                            name: 'Midea',
                            image: './img/sponsors/img_sponsor7.png',
                        },
                         {
                            name: 'GREE',
                            image: './img/sponsors/img_sponsor8.png',
                        },
                    ].map((brand) => (
                        <div
                            key={brand.name}
                            className="trustedCard"
                        >
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="trustedLogo"
                            />
                        </div>
                    ))}

                </div>
                <p className="trustedDescription">
                    Trabalhamos com as principais marcas do mercado para garantir
                    máxima eficiência, tecnologia e durabilidade.
                </p>
            </div>

        </section>
    );
}