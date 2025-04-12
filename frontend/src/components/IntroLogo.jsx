// src/components/IntroLogo.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroLogo = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish(); // Notify parent that animation is done
    }, 3000); // Duration of animation (3 sec)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-emerald-400"
            initial={{ y: 0 }}
            animate={{ y: -50 }}
            transition={{ duration: 2 }}
          >
            🚓 Virtual Police
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLogo;
