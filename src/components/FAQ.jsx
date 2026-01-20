import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function FAQ() {
  const faqs = [
    {
      q: "Can I participate in multiple events?",
      a: "Yes. Participants are allowed to register for and participate in multiple events, provided there are no schedule conflicts.",
    },
    {
      q: "Is this event open to students from other colleges?",
      a: "Yes. Students from all colleges are welcome to participate in Astranova 26.",
    },
    {
      q: "Will certificates be provided?",
      a: "Yes. Participation and winner certificates will be provided for all registered events.",
    },
    {
      q: "Do I need to bring my own laptop?",
      a: "For technical events, participants are advised to bring their own laptops fully charged.",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#030712] to-black">
      <div className="relative z-10 py-28 px-4 sm:px-6">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            text-center
            text-3xl sm:text-4xl lg:text-5xl
            font-extrabold
            tracking-wide
            bg-gradient-to-r from-cyan-400 to-blue-500
            bg-clip-text text-transparent
            mb-16
          "
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ LIST */}
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((item, index) => (
            <motion.details
              key={index}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="
                group
                relative
                rounded-2xl
                border border-white/10
                bg-black/50
                backdrop-blur-xl
                p-6
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
              "
            >
              <summary
                className="
                  flex items-center justify-between
                  cursor-pointer
                  list-none
                  font-semibold
                  text-white
                  text-base sm:text-lg
                  tracking-wide
                  focus:outline-none
                "
              >
                {item.q}

                {/* ICON */}
                <span
                  className="
                    ml-4
                    flex h-9 w-9
                    items-center justify-center
                    rounded-full
                    border border-cyan-400/40
                    text-cyan-400
                    transition-all duration-300
                    group-open:rotate-45
                    group-open:bg-cyan-400
                    group-open:text-black
                  "
                >
                  +
                </span>
              </summary>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="
                  mt-4
                  text-gray-300
                  leading-relaxed
                  text-sm sm:text-base
                "
              >
                {item.a}
              </motion.p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
