import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const [openQR, setOpenQR] = useState(false);

  const scrollToEvent = useCallback(() => {
    document
      .getElementById("event")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ✅ UPI Link (works with GPay / PhonePe / Paytm)
  const upiLink =
    "upi://pay?pa=9962349659@ybl&pn=Arul%20Prakash%20Sanmugasundaram&cu=INR&tn=Symposium%20Registration%20Fee";

  const openUPIApp = () => {
    window.location.href = upiLink;
  };

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
            <h2 className="heroDept">
              Department of Computer Science & Engineering
            </h2>
            <h4 className="heroTag">INNOVATE • COMPETE • ELEVATE</h4>
          </div>

          {/* ✅ Buttons */}
          <div className="heroBtnRow">
            <motion.button
              onClick={scrollToEvent}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="heroRegisterBtn"
            >
              REGISTER NOW
            </motion.button>

            <motion.button
              onClick={() => setOpenQR(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className="heroPayBtn"
            >
              PAY NOW
            </motion.button>
          </div>
        </div>

        {/* ✅ QR Dialog */}
        <AnimatePresence>
          {openQR && (
            <motion.div
              className="qrOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenQR(false)}
            >
              <motion.div
                className="qrModal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* ✅ ONLY QR (as you asked) */}
                <img
                  src="/qr.png"
                  alt="Scan to Pay"
                  className="qrImage"
                  onClick={openUPIApp} // ✅ click QR = open UPI app
                />

                {/* ✅ Extra button for direct open */}
                <motion.button
                  onClick={openUPIApp}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className="openUpiBtn"
                >
                  OPEN IN GPay / PhonePe
                </motion.button>

                <button className="qrCloseBtn" onClick={() => setOpenQR(false)}>
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
