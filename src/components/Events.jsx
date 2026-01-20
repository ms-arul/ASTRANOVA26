import { events } from "../data/events";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  const [timeLeft, setTimeLeft] = useState({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  const eventDate = new Date("2026-02-12T09:00:00").getTime();

  /* ⏱ COUNTDOWN */
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

  /* ⚡ AUTO SCROLL (MOBILE ONLY) */
  useEffect(() => {
    if (!carouselRef.current || window.innerWidth >= 768) return;

    autoScrollRef.current = setInterval(() => {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }, 3500);

    return () => clearInterval(autoScrollRef.current);
  }, []);

  /* 🔔 FORM SUBMIT DETECTION */
  useEffect(() => {
    const onFocus = () => {
      if (selectedEvent) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [selectedEvent]);

  return (
    <section id="event" className="min-h-screen py-24 px-4 relative">

      {/* TITLE */}
      <h2 className="text-center mb-6 text-4xl sm:text-5xl font-extrabold tracking-widest
        bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
        bg-clip-text text-transparent">
        COMPETITIONS
      </h2>

      {/* 👆 SWIPE INDICATOR (MOBILE ONLY) */}
      <AnimatePresence>
        {showSwipeHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              md:hidden
              flex justify-center items-center
              gap-3 mb-8
              text-sm text-white/80
            "
          >
            <motion.span
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-xl text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"
            >
              ←
            </motion.span>

            <span className="tracking-widest uppercase">
              Swipe
            </span>

            <motion.span
              animate={{ x: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-xl text-cyan-400 drop-shadow-[0_0_10px_#22d3ee]"
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📱 SWIPE / 💻 GRID */}
      <div
        ref={carouselRef}
        onScroll={() => setShowSwipeHint(false)}
        onTouchStart={() => clearInterval(autoScrollRef.current)}
        className="
          flex md:grid md:grid-cols-2
          gap-10 max-w-6xl mx-auto
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          pb-6 scroll-smooth
        "
      >
        {events.map((e, i) => {
          const accent = ACCENTS[e.category] || ACCENTS.Coding;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="
                snap-center min-w-[90%] md:min-w-0
                relative rounded-2xl overflow-hidden
                flex flex-col sm:flex-row
                border border-white/20
                shadow-[0_0_40px_rgba(0,255,255,0.15)]
                min-h-[380px]
              "
            >
              {/* 🔥 NEON GLOW */}
              <motion.div
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute -inset-1 bg-gradient-to-r ${accent} blur-2xl`}
              />

              {/* LEFT */}
              <div className="relative z-10 p-8 w-full sm:w-[60%] text-center">
                <span className={`inline-block mb-4 px-4 py-1.5 rounded-full text-xs uppercase
                  bg-gradient-to-r ${accent} text-white`}>
                  {e.category}
                </span>

                <img
                  src={e.icon}
                  alt={e.title}
                  className="mx-auto w-20 h-20 sm:w-28 sm:h-28 object-contain"
                />

                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white
                  whitespace-nowrap overflow-hidden text-ellipsis">
                  {e.title}
                </h3>

                <p className="mt-2 text-sm text-white/80 line-clamp-2">
                  {e.desc}
                </p>

                <button
                  onClick={() => setSelectedEvent(e)}
                  className={`mt-6 px-6 py-2.5 rounded-full
                    bg-gradient-to-r ${accent}
                    text-white font-semibold hover:scale-110 transition`}
                >
                  Register →
                </button>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-full sm:w-[40%] h-[180px] sm:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${e.bg})` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🎯 MODAL */}
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
              className="bg-black/70 backdrop-blur-xl p-6 rounded-2xl
                max-w-2xl w-full border border-white/20 text-white"
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {selectedEvent.title}
              </h3>

              <div className="grid grid-cols-4 gap-2 text-center mb-4">
                {Object.entries(timeLeft).map(([k, v]) => (
                  <div key={k}>
                    <p className="text-lg font-bold">{v}</p>
                    <p className="text-xs uppercase opacity-70">{k}</p>
                  </div>
                ))}
              </div>

              <div className="h-[420px] rounded-xl overflow-hidden border border-white/20">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScuR2BqnLjH7kLRGz1cP36EfhaGISXcr6oNseHGFWhhuk4jYQ/viewform?embedded=true"
                  className="w-full h-full"
                  title="Registration Form"
                />
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-4 w-full py-2.5 rounded-full
                  bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                  text-black font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔔 SUCCESS TOAST */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2
              px-6 py-3 rounded-full
              bg-gradient-to-r from-green-400 to-emerald-500
              text-black font-semibold shadow-xl z-50"
          >
            ✅ Registration submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
