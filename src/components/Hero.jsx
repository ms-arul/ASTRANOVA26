import React, { useMemo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import StarNetwork from "./StarNetwork";
import GalaxyBackground from "./GalaxyBackground";
import "./Hero.css";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToEvent = useCallback(() => {
    document
      .getElementById("event")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const particleOptions = useMemo(() => {
    return {
      fullScreen: { enable: false },
      fpsLimit: isMobile ? 30 : 45,
      detectRetina: true,

      interactivity: {
        events: {
          onHover: { enable: !isMobile, mode: "repulse" },
        },
        modes: {
          repulse: { distance: isMobile ? 70 : 120, duration: 0.3 },
        },
      },

      particles: {
        number: {
          value: isMobile ? 22 : 55,
          density: { enable: true, area: 900 },
        },
        color: { value: ["#22d3ee", "#a855f7", "#ec4899"] },
        opacity: { value: 0.32 },
        size: { value: { min: 1, max: isMobile ? 2 : 2.6 } },
        move: { enable: true, speed: isMobile ? 0.28 : 0.55 },
        links: {
          enable: true,
          distance: isMobile ? 95 : 150,
          opacity: 0.14,
          width: 1,
        },
      },
    };
  }, [isMobile]);

  return (
    <section className="heroMobile">
      {/* ✅ Background layers */}
      <div className="heroLayer" style={{ zIndex: 0 }}>
        <StarNetwork />
      </div>

      <div className="heroLayer" style={{ zIndex: 1, opacity: 0.8 }}>
        <GalaxyBackground />
      </div>

      <div className="heroLayer" style={{ zIndex: 2 }}>
        <div className="heroSpotlight" />
      </div>

      <Particles
        className="heroLayer"
        style={{ zIndex: 3 }}
        options={particleOptions}
      />

      {/* ✅ Layout like screenshot */}
      <div className="heroWrap">
        {/* ✅ TOP: College Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heroHeaderCard"
        >
          
        </motion.div>

        {/* ✅ CENTER: Star only (Perfect middle like screenshot) */}
        <div className="heroCenterArea">
          <motion.img
            src="/logo1.png"
            alt="ASTRANOVA 26"
            className="heroMainLogo"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* ✅ BOTTOM: Texts + Button + Divider (like screenshot) */}
        <div className="heroBottomArea">
          <div className="heroTexts">
            <p className="heroDept">
              Department of Computer Science & <br /> Engineering
            </p>

            <p className="heroTag">
              INNOVATE • COMPETE • <br /> ELEVATE
            </p>
          </div>

          <motion.button
            onClick={scrollToEvent}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="heroRegisterBtn"
          >
            REGISTER NOW
          </motion.button>

          {/* ✅ Bottom divider */}
          <div className="heroBottomDivider" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
