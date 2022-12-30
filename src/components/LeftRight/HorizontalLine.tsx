import { useAtomValue } from "jotai";

import { positionTopAtom, timeAtom } from "../../atoms/left-right";
import { LAYER, Primary } from "../../constants";
import { TOP_TRANSITION } from "../../constants/left-right";

const HorizontalLine = () => {
  const top = useAtomValue(positionTopAtom);
  const time = useAtomValue(timeAtom);

  const getD = () => {
    return `M0 2.50024L961.5 ${Math.round((top * 10 - 700) * 3)}L1920 2.50008`;
  };

  const getStopColor = () => {
    if (time > 90) return Primary[200];
    if (time > 75) return Primary[300];
    if (time > 60) return Primary[400];
    if (time > 45) return Primary[500];
    if (time > 30) return Primary[600];
    if (time > 15) return Primary[700];
    return Primary[800];
  };

  return (
    <>
      {/* heart */}
      <svg
        style={{
          position: "absolute",
          transition: TOP_TRANSITION,
          top: `calc(${top}% - 60px + ${(top * 10 - 700) / 1.1}px)`,
          left: "50%",
          transform: "translate(-50%, -20%)",
          zIndex: LAYER.TOP,
        }}
        width="131"
        height="105"
        viewBox="0 0 131 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 21L32.75 42L5.42724e-07 63L0 21Z" fill="#03045E" />
        <path d="M32.75 0V42L0 21L32.75 0Z" fill="#023E8A" />
        <path d="M32.75 42V84L5.42724e-07 63L32.75 42Z" fill="#023E8A" />
        <path d="M32.75 0L65.5 21L32.75 42V0Z" fill="#0077B6" />
        <path d="M32.75 42L65.5 63L32.75 84V42Z" fill="#0077B6" />
        <path d="M65.5 21V63L32.75 42L65.5 21Z" fill="#0096C7" />
        <path d="M98.25 0V42L65.5 21L98.25 0Z" fill="#0096C7" />
        <path d="M131 21V63L98.25 42L131 21Z" fill="#48CAE4" />
        <path d="M65.5 21L98.25 42L65.5 63V21Z" fill="#90E0EF" />
        <path d="M98.25 0L131 21L98.25 42V0Z" fill="#90E0EF" />
        <path d="M98.25 42L131 63L98.25 84V42Z" fill="#90E0EF" />
        <path d="M98.25 42V84L65.5 63L98.25 42Z" fill="#ADE8F4" />
        <path d="M65.5 63V105L32.75 84L65.5 63Z" fill="#ADE8F4" />
        <path d="M65.5 63L98.25 84L65.5 105V63Z" fill="#CAF0F8" />
      </svg>

      {/* line */}
      <svg
        style={{
          position: "absolute",
          top: `${top}%`,
          left: "50%",
          transform: "translate(-50%, -20%)",
          transition: TOP_TRANSITION,
        }}
        width="600px"
        height="148px"
        viewBox="0 0 1920 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={getD()} stroke="url(#paint0_linear_120_56)" strokeWidth="4" />
        <defs>
          <linearGradient
            id="paint0_linear_120_56"
            x1="1920"
            y1="2.50024"
            x2="0"
            y2="2.50024"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff00" />
            <stop offset="0.46875" stopColor={getStopColor()} />
            <stop offset="1" stopColor="#ffffff00" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};

export default HorizontalLine;
