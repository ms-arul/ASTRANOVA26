import { events } from "../data/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ================= ACCENT COLORS ================= */
const ACCENTS = {
  Coding: "from-cyan-500 via-sky-500 to-blue-600",
  Quiz: "from-indigo-500 via-blue-600 to-purple-700",
  Debugging: "from-amber-500 via-orange-500 to-red-600",
  Design: "from-violet-500 via-purple-600 to-fuchsia-600",
  Innovation: "from-pink-500 via-rose-500 to-red-600",
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate = new Date("2026-02-12T09:00:00").getTime();

  useEffect(() => {
    const t = setInterval(() => {
      const d = Math.max(eventDate - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((d / (1000 * 60)) % 60),
        seconds: Math.floor((d / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(t);
  }, [eventDate]);

  return (
    <section id="event" className="min-h-screen py-28 px-4 sm:px-6">
      {/* TITLE */}
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-widest
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
          bg-clip-text text-transparent">
          COMPETITIONS
        </h2>
      </div>

      {/* EVENT GRID */}
      <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
        {events.map((e, i) => {
          const accent = ACCENTS[e.category] || ACCENTS.Coding;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="
                relative overflow-hidden rounded-2xl
                border border-white/20
                shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                flex flex-col sm:flex-row
              "
            >
              {/* GLOW BACKDROP */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${accent} opacity-25 blur-2xl`} />

              {/* LEFT CONTENT */}
              <div className="relative z-10 w-full sm:w-[60%] p-8 text-center md:text-center">

                {/* CATEGORY BADGE */}
                <div className="flex justify-center mb-4">
                  <span
                    className={`
                      relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest
                      bg-gradient-to-r ${accent}
                      text-white
                      shadow-[0_0_25px_rgba(255,255,255,0.35)]
                    `}
                  >
                    {e.category}
                  </span>
                </div>

                {/* ICON + TITLE CENTERED */}
                <motion.div
                  whileHover={{
                    y: -6,
                    rotate: 3,
                    scale: 1.12,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                  }}
                  className="flex flex-col items-center mb-4"
                >
                  <img
                    src={e.icon}
                    alt={e.title}
                    className="
                      w-30 h-30 object-contain
                      drop-shadow-[0_0_25px_rgba(255,255,255,0.5)]
                    "
                  />

                  <h3 className="mt-4 text-2xl font-extrabold text-white">
                    {e.title}
                  </h3>
                </motion.div>

                <p className="mt-2 text-white/80 text-sm leading-relaxed max-w-sm mx-auto">
                  {e.desc}
                </p>

                <button
                  onClick={() => setSelectedEvent(e)}
                  className={`
                    mt-6 px-8 py-2.5 rounded-full
                    bg-gradient-to-r ${accent}
                    text-white font-semibold tracking-wide
                    shadow-[0_12px_35px_rgba(0,0,0,0.45)]
                    hover:scale-110 hover:saturate-150
                    transition-all duration-300
                  `}
                >
                  Register →
                </button>
              </div>

              {/* RIGHT VISUAL */}
              <div className="relative w-full sm:w-[40%] min-h-[220px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${e.bg})` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="
                bg-gradient-to-br from-black/70 to-black/40
                backdrop-blur-xl
                text-white p-8 rounded-2xl max-w-lg w-full
                border border-white/20
                shadow-2xl
              "
            >
              <h3 className="text-2xl font-bold text-center mb-6">
                {selectedEvent.title}
              </h3>

              <div className="grid grid-cols-4 gap-3 text-center mb-6">
                {Object.entries(timeLeft).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xl font-bold">{v}</p>
                    <p className="text-xs opacity-70 uppercase">{k}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="
                  w-full py-2.5 rounded-full
                  bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                  text-black font-semibold
                  hover:scale-105 transition
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
