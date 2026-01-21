import React, { useCallback } from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const scrollToEvent = useCallback(() => {
    document
      .getElementById("event")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ UPI DETAILS
  const NAME = "Arul Prakash Sanmugasundaram";
  const UPI_PRIMARY = "9962349659@ybl";
  const UPI_BACKUP = "9962349659@ibl";

  const NOTE = "Symposium Registration Fee - Pay 100";

  // ✅ Build UPI Link (amount removed to reduce limit issue)
  const buildUPILink = (upiId) =>
    `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
      NAME
    )}&cu=INR&tn=${encodeURIComponent(NOTE)}`;

  const handlePayment = useCallback(() => {
    // ✅ One button: choose primary / backup
    const usePrimary = window.confirm(
      "Pay Symposium Fee ₹100 ✅\n\nPress OK → Pay using UPI 1\nPress Cancel → Pay using UPI 2 (Backup)"
    );

    const link = usePrimary ? buildUPILink(UPI_PRIMARY) : buildUPILink(UPI_BACKUP);

    // ✅ Open UPI app
    window.location.href = link;
  }, []);

  return (
    <section className="heroMobile">
      <div className="heroWrap">
        {/* ✅ TOP: College Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heroHeaderCard"
        >
          {/* your header content */}
        </motion.div>

        {/* ✅ CENTER: Logo */}
        <div className="heroCenterArea">
          <motion.img
            src="/logo1.png"
            alt="ASTRANOVA 26"
            className="heroMainLogo"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* ✅ BOTTOM */}
        <div className="heroBottomArea">
          <div className="heroTexts">
            {/* ✅ Department in ONE LINE */}
            <h2 className="heroDept">
              Department of Computer Science & Engineering
            </h2>

            {/* ✅ Motion Gradient Slogan */}
            <h4 className="heroTag">INNOVATE • COMPETE • ELEVATE</h4>
          </div>

          {/* ✅ Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            {/* ✅ REGISTER */}
            <motion.button
              onClick={scrollToEvent}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="heroRegisterBtn"
            >
              REGISTER NOW
            </motion.button>

            {/* ✅ PAYMENT */}
            <motion.button
              onClick={handlePayment}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="heroPayBtn"
            >
              PAY ₹100
            </motion.button>
          </div>

          {/* ✅ Small note under buttons */}
          <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.85, textAlign: "center" }}>
            If payment shows <b>Limit Exceeded</b>, press Cancel to use Backup UPI ✅
          </p>

          {/* ❌ Removed Bottom Divider Bar */}
          {/* <div className="heroBottomDivider" /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
