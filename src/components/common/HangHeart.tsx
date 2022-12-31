import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LAYER } from "../../constants";

const HangHeart = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState<boolean>(true);

  const moveToHomeAfterAnimate = () => {
    setIsMounted(false);
    setTimeout(() => {
      navigate("/");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          layout
          style={{
            position: "fixed",
            left: "20px",
            top: "-95px",
            zIndex: LAYER.TOP,
          }}
          whileHover={{
            cursor: "pointer",
          }}
          initial={{
            y: -80,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            duration: 2.5,
          }}
          exit={{
            y: -100,
          }}
          onClick={moveToHomeAfterAnimate}
        >
          <svg
            width="32"
            height="149"
            viewBox="0 0 32 149"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="16" y1="-4.37114e-08" x2="16" y2="129" stroke="white" strokeWidth="2" />
            <path
              d="M14.91 129.877L16 130.585L17.09 129.877L24 125.385L30 129.285V137.515L22.91 142.123L16 146.615L9.08998 142.123L2 137.515V129.285L8 125.385L14.91 129.877Z"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(HangHeart);
