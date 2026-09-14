import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Clock3,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

import { FaWhatsapp } from 'react-icons/fa';

import '../css/Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">

      {/* BACKGROUND EFFECT */}
      <div className="footerGlow"></div>

      <div className="footerContainer sectionContainer">

        {/* ================= TOP INFO ================= */}
        <div className="footerTop">

          {/* BRAND */}
          <div className="footerBrand">

            <div className="footerLogoBox">
              <img
                src="/img/logo/logoBranco.png"
                alt="Núcleo Ar"
                className="footerLogo"
              />
              <div className="footerSocials">

                <a href="#" className="footerSocialLink">
                  <Instagram className="footerSocialIcon" />
                </a>

                <a href="#" className="footerSocialLink">
                  <Linkedin className="footerSocialIcon" />
                </a>

                <a href="#" className="footerSocialLink">
                  <Facebook className="footerSocialIcon" />
                </a>

              </div>
            </div>

            <p className="footerDescription">
              Especialistas em climatização residencial, comercial e industrial,
              oferecendo instalação, manutenção preventiva e suporte técnico com
              excelência e agilidade.
            </p>

            <div className="footerBadges">

              <div className="footerBadge">
                <ShieldCheck size={16} />
                <span>Equipe Certificada</span>
              </div>

              <div className="footerBadge">
                <Clock3 size={16} />
                <span>Atendimento Rápido</span>
              </div>

            </div>

          </div>


          {/* LINKS */}
          <div className="footerColumn">
            <h3 className="footerTitle">Links rápidos</h3>

            <a href="#home" className="footerLinkItem">
              <ChevronRight size={16} />
              <span>Início</span>
            </a>

            <a href="#about" className="footerLinkItem">
              <ChevronRight size={16} />
              <span>Sobre nós</span>
            </a>

            <a href="#services" className="footerLinkItem">
              <ChevronRight size={16} />
              <span>Serviços</span>
            </a>

            <a href="#contact" className="footerLinkItem">
              <ChevronRight size={16} />
              <span>Contato</span>
            </a>
          </div>


          {/* LOCALIZAÇÃO */}
          <div className="footerColumn">
            <h3 className="footerTitle">Localização</h3>



            <div className="footerMapWrapper">
              <iframe
                title="Mapa Núcleo Ar"
                src="https://www.google.com/maps?q=R.%20Nestor%20de%20Barros,%20200%20-%20Vila%20Regente%20Feijó,%20São%20Paulo%20-%20SP&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="footerMap"
              ></iframe>
            </div>
          </div>


          {/* CONTATO */}
          <div className="footerColumn">
            <h3 className="footerTitle">Contato</h3>

            <div className="footerContactItem">
              <Phone size={18} />
              <span>(11) 2015-5266</span>
            </div>

            <div className="footerContactItem footerWhatsapp">
              <FaWhatsapp size={18} />
              <span>(11) 91044-7441</span>
            </div>

            <div className="footerContactItem">
              <Mail size={18} />
              <span>nucleoar@nucleoar.com.br</span>
            </div>

            <div className="footerLocationInfo">
              <MapPin size={18} />

              <span>
                R. Nestor de Barros, 200 <br />
                Vila Regente Feijó - São Paulo/SP
              </span>
            </div>
          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="footerBottom">

          <p className="footerCopyright">
            © 2026 Núcleo Ar Climatização. Todos os direitos reservados.&nbsp;
     
 
          </p>





        </div>

      </div>

    </footer>
  );
}

