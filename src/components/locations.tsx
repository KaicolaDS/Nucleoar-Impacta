import React, { useState } from 'react';
import { motion } from 'motion/react';

import {
  MapPin,
  ShieldCheck,
} from 'lucide-react';

import '../css/Locations.css';

const REGIONS = [
  {
    id: 'zona-sul',
    label: 'Zona Sul',
    cities: [
      'Moema', 'Brooklin', 'Vila Mariana', 'Santo Amaro',
      'Campo Belo', 'Ipiranga', 'Saúde', 'Jabaquara',
      'Morumbi', 'Pinheiros', 'Butantã', 'Osasco',
    ],
  },
  {
    id: 'zona-norte',
    label: 'Zona Norte',
    cities: [
      'Santana', 'Tucuruvi', 'Casa Verde', 'Vila Maria',
      'Jaçanã', 'Mandaqui', 'Limão', 'Freguesia do Ó',
      'Pirituba', 'Brasilândia', 'Tremembé', 'Vila Guilherme',
    ],
  },
  {
    id: 'zona-oeste',
    label: 'Zona Oeste',
    cities: [
      'Lapa', 'Perdizes', 'Pompeia', 'Alto de Pinheiros',
      'Jaguaré', 'Vila Leopoldina', 'Barra Funda', 'Água Branca',
      'Raposo Tavares', 'Butantã', 'Pinheiros', 'Vila Madalena',
    ],
  },
  {
    id: 'zona-leste',
    label: 'Zona Leste',
    cities: [
      'Tatuapé', 'Mooca', 'Penha', 'Aricanduva',
      'Itaquera', 'São Miguel', 'Carrão', 'Belém',
      'Vila Formosa', 'Guaianases', 'São Mateus', 'Cidade Tiradentes',
    ],
  },
  {
    id: 'grande-sp',
    label: 'Grande SP',
    cities: [
      'Guarulhos', 'Santo André', 'São Bernardo', 'Diadema',
      'Barueri', 'Cotia', 'Taboão da Serra', 'Embu das Artes',
      'Mauá', 'Osasco', 'Carapicuíba', 'Itapevi',
    ],
  },
  {
    id: 'litoral',
    label: 'Litoral',
    cities: [
      'Santos', 'São Vicente', 'Praia Grande', 'Guarujá',
      'Cubatão', 'Bertioga', 'Mongaguá', 'Itanhaém',
      'Peruíbe', 'Caraguatatuba', 'Ubatuba', 'Ilhabela',
    ],
  },
] as const;

export default function Locations() {
  const [activeRegion, setActiveRegion] = useState<(typeof REGIONS)[number]['id']>(REGIONS[0].id);
  const currentRegion = REGIONS.find((region) => region.id === activeRegion) ?? REGIONS[0];

  return (

    <section
      id="locations"
      className="locations"
    >

      <div className="locationsContainer sectionContainer">

        {/* =======================================================
            TITLE
        ======================================================= */}

        <motion.div
          className="containerTitle"
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8
          }}
        >

          <img
            src="./img/logo/iconColorida.png"
            alt="Logo Núcleoar"
            className="nucleoarLogo rotatingLogo"
          />

          {/* SECTION TAG */}

          <span className="sectionHeaderCentralize">

            <span className="line" />

            <span className="sectionTag">
              REGIÕES ATENDIDAS
            </span>

            <span className="line" />

          </span>

          {/* TITLE */}

          <h2 className="locationsTitle">

            Onde
            <span> atendemos </span>

          </h2>
          <div className="titleDividerCentralize" />

        </motion.div>

        {/* =======================================================
            CONTENT
        ======================================================= */}

        <motion.div
          className="locationsSection"
          initial={{
            opacity: 0,
            y: 40
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8
          }}
        >

          {/* =======================================================
              TABS
          ======================================================= */}

          <div className="locationsTabs">
            {REGIONS.map((region) => (
              <button
                key={region.id}
                type="button"
                className={`locationTab${activeRegion === region.id ? ' active' : ''}`}
                onClick={() => setActiveRegion(region.id)}
                aria-pressed={activeRegion === region.id}
              >
                {region.label}
              </button>
            ))}
          </div>

          {/* =======================================================
              GRID
          ======================================================= */}

          <div className="locationsGrid" key={currentRegion.id}>
            {currentRegion.cities.map((city) => (
              <div className="locationItem" key={city}>
                <MapPin size={16} />
                <span>{city}</span>
              </div>
            ))}
          </div>

        </motion.div>

        {/* =======================================================
            FOOTER
        ======================================================= */}

        <motion.div
          className="locationsFooter"
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7
          }}
        >

          <div className="locationsFooterInfo">

            <ShieldCheck size={18} />

            <span>
              Mais de 45 cidades atendidas em São Paulo
              e região metropolitana.
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}