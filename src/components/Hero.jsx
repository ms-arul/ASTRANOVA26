import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import StarNetwork from "./StarNetwork";
import GalaxyBackground from "./GalaxyBackground";

const Hero = () => {
  const scrollToEvent = useCallback(() => {
    document
      .getElementById("event")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ======================
     PARTICLES (OPTIMIZED)
  ====================== */
  const particleOptions = useMemo(() => {
    const isMobile = window.innerWidth < 640;

    return {
      fullScreen: { enable: false },
      fpsLimit: isMobile ? 30 : 45,
      detectRetina: false,

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
          value: isMobile ? 24 : 58,
          density: { enable: true, area: 900 },
        },
        color: { value: ["#22d3ee", "#a855f7", "#ec4899"] },
        opacity: { value: 0.35 },
        size: { value: { min: 1, max: isMobile ? 2 : 2.5 } },
        move: { enable: true, speed: isMobile ? 0.3 : 0.55 },
        links: {
          enable: true,
          distance: isMobile ? 100 : 150,
          opacity: 0.14,
          width: 1,
        },
      },
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* ======================
         BACKGROUND LAYERS
      ====================== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarNetwork />
      </div>

      <div className="absolute inset-0 z-[1] opacity-80 pointer-events-none">
        <GalaxyBackground />
      </div>

      {/* Soft spotlight */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10)_0%,rgba(0,0,0,0.85)_75%)]" />
      </div>

      {/* Particles */}
      <Particles
        className="absolute inset-0 z-[3] pointer-events-none"
        options={particleOptions}
      />

      {/* ======================
         CONTENT
      ====================== */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center px-4"
      >
        <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl text-center px-4 sm:px-8 md:px-12">
          {/* LOGO */}
          <motion.img
            src="/logo1.png"
            alt="ASTRANOVA 2026"
            className="
              mx-auto w-64 sm:w-72 md:w-96 lg:w-[420px]
              object-contain
              drop-shadow-[0_0_20px_rgba(0,255,255,0.40)]
            "
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* DEPARTMENT */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 sm:mt-6 text-[14px] sm:text-base md:text-lg font-serif font-medium text-white/95"
          >
            Department of Computer Science & Engineering
          </motion.p>

          {/* TAGLINE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="
              mt-2 text-[12px] sm:text-sm
              uppercase tracking-[0.35em]
              font-semibold text-cyan-200
            "
          >
            Innovate • Compete • Elevate
          </motion.p>

          {/* ======================
             EVENT DATE
          ====================== */}

          {/* Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="
              hidden md:flex
              mt-6 mb-1
              items-center justify-center gap-4
              text-sm font-semibold tracking-widest
            "
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            <span className="
              px-6 py-2 rounded-full
              bg-gradient-to-r from-cyan-400/15 via-purple-500/15 to-pink-500/15
              border border-white/15
              backdrop-blur-sm
              text-cyan-200
            ">
              📅 12 FEB 2026
            </span>

            <span className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </motion.div>

          {/* Mobile (FIXED ✅) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="md:hidden mt-5 flex justify-center"
          >
            <span className="
              px-4 py-1.5 rounded-full
              bg-cyan-400/15
              border border-cyan-400/30
              text-xs tracking-widest text-cyan-200
            ">
              📅 12 FEB 2026
            </span>
          </motion.div>

          {/* ======================
             CTA
          ====================== */}
          <motion.button
            onClick={scrollToEvent}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="
              relative mt-7 sm:mt-10
              px-9 py-3 rounded-full overflow-hidden
              bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
              text-sm sm:text-base text-white font-bold tracking-widest
              shadow-[0_0_30px_rgba(168,85,247,0.6)]
              ring-1 ring-white/20 hover:ring-white/40
            "
          >
            {/* Shine */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="absolute -left-[40%] top-0 h-full w-[35%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shine_3s_linear_infinite]" />
            </span>

            <span className="relative z-10">REGISTER NOW</span>
          </motion.button>

          {/* Divider */}
          <div className="mt-9 h-[2px] w-40 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-80" />
        </div>
      </motion.div>

      {/* ======================
         KEYFRAMES
      ====================== */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-160%) rotate(12deg); opacity: 0; }
            25% { opacity: 0.8; }
            60% { opacity: 0.25; }
            100% { transform: translateX(360%) rotate(12deg); opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;