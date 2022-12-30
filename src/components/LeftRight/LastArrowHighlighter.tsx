import { motion } from "framer-motion";

import { LAYER } from "../../constants";

const LastArrowHighlighter = () => {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "78%",
        transform: "translateX(-50%)",
        width: "100px",
        height: "100px",
        zIndex: LAYER.ABSOLUTE,
        opacity: 0.3,
      }}
      animate={{
        strokeDashoffset: [0, 100],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="10 10"
        />
      </svg>
    </motion.div>
  );
};

export default LastArrowHighlighter;
