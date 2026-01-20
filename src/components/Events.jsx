import { events } from "../data/events";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ✅ STATIC GRADIENT MAP (Tailwind safe ✅) */
const GRADIENTS = {
  apex: "from-emerald-400 via-cyan-500 to-blue-600",
  quiz: "from-indigo-500 via-purple-600 to-pink-500",
  prompt: "from-teal-400 via-sky-500 to-indigo-600",
  debug: "from-amber-400 via-orange-500 to-red-600",
  uxplore: "from-pink-500 via-rose-500 to-red-600",

  // fallback
  default: "from-cyan-500 via-sky-500 to-blue-600",
};

/* ✅ Default Form Link */
const DEFAULT_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLScuR2BqnLjH7kLRGz1cP36EfhaGISXcr6oNseHGFWhhuk4jYQ/viewform";

/* ✅ Typing text */
function TypingTextOnView({ text = "", className = "", start = false, speed }) {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!start) {
      setTyped("");
      return;
    }

    let i = 0;
    setTyped("");

    const timer = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, start, speed]);

  useEffect(() => {
    if (!start) return;
    const cursor = setInterval(() => setShowCursor((p) => !p), 450);
    return () => clearInterval(cursor);
  }, [start]);

  return (
    <p className={className}>
      {typed}
      {typed.length < text.length && (
        <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
      )}
    </p>
  );
}

/* ✅ Event Card */
function EventCard({ e, onOpen, typingSpeed }) {
  // ✅ USE STATIC ACCENT KEY
  const accent = GRADIENTS[e.accentKey] || GRADIENTS.default;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.04 }}
      className="snap-center min-w-[90%] md:min-w-0 relative rounded-2xl overflow-hidden
                 flex flex-col sm:flex-row border border-white/20
                 shadow-[0_0_40px_rgba(0,255,255,0.15)] min-h-[340px]"
    >
      {/* ✅ GLOW */}
      <motion.div
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`absolute -inset-1 bg-gradient-to-r ${accent} blur-2xl`}
      />

      {/* LEFT */}
      <div className="relative z-10 p-8 w-full sm:w-[60%] flex flex-col justify-center text-center">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest">
          {e.title}
        </h3>

        {/* ✅ BADGE */}
        <span
          className={`mx-auto mt-3 px-4 py-1.5 rounded-full text-xs uppercase font-semibold
                      bg-gradient-to-r ${accent} text-white`}
        >
          {e.category}
        </span>

        {/* ✅ Typing Desc */}
        <TypingTextOnView
          text={e.desc}
          start={inView}
          speed={typingSpeed}
          className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed min-h-[90px]"
        />

        <button
          onClick={() => onOpen(e)}
          className={`mt-6 px-6 py-2.5 rounded-full
                      bg-gradient-to-r ${accent}
                      text-white font-semibold hover:scale-110 transition`}
        >
          View Details →
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full sm:w-[40%] h-[180px] sm:h-auto">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${e.bg})` }}
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>
    </motion.div>
  );
}

/* ✅ Small detail box */
function Detail({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
      <p className="text-xs uppercase opacity-70">{label}</p>
      <p className="font-bold text-sm mt-1">{value || "TBA"}</p>
    </div>
  );
}

/* ✅ MAIN */
export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const typingSpeed = isMobile ? 10 : 22;

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

  const handleRegister = () => {
    const link = selectedEvent?.formLink || DEFAULT_FORM_LINK;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // ✅ modal accent also using accentKey
  const modalAccent =
    selectedEvent?.accentKey && GRADIENTS[selectedEvent.accentKey]
      ? GRADIENTS[selectedEvent.accentKey]
      : GRADIENTS.default;

  return (
    <section id="event" className="min-h-screen py-24 px-4">
      <h2 className="text-center mb-10 text-4xl sm:text-5xl font-extrabold tracking-widest
                     bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
                     bg-clip-text text-transparent">
        COMPETITIONS
      </h2>

      {/* CARDS */}
      <div
        ref={carouselRef}
        className="flex md:grid md:grid-cols-2 gap-10 max-w-6xl mx-auto
                   overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6"
      >
        {events.map((e) => (
          <EventCard
            key={e.id}
            e={e}
            onOpen={setSelectedEvent}
            typingSpeed={typingSpeed}
          />
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/70 backdrop-blur-xl p-6 rounded-2xl
                         max-w-2xl w-full border border-white/20 text-white relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full
                           bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
              >
                ✕
              </button>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-3">
                {selectedEvent.title}
              </h3>

              <div className="flex justify-center mb-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs uppercase font-semibold
                              bg-gradient-to-r ${modalAccent} text-white`}
                >
                  {selectedEvent.category}
                </span>
              </div>

              <p className="text-center text-white/80 mb-6">
                {selectedEvent.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center">
                <Detail label="Date" value={selectedEvent.date} />
                <Detail label="Time" value={selectedEvent.time} />
                <Detail label="Team" value={selectedEvent.teamSize} />
                <Detail label="Prize" value={selectedEvent.prizePool} />
              </div>

              <p className="text-center mb-6">
                <span className="text-xs uppercase opacity-70">Venue</span>
                <br />
                <span className="font-semibold">{selectedEvent.venue}</span>
              </p>

              <button
                onClick={handleRegister}
                className={`w-full py-3 rounded-full bg-gradient-to-r ${modalAccent}
                            text-white font-extrabold tracking-widest hover:scale-[1.03] transition`}
              >
                Register Now →
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-3 w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition"
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
