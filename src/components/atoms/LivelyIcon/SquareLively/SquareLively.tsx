import React, { useEffect, useRef, useState } from "react";
import styles from "./SquareLively.module.scss";
import { useVirtualScroll } from "@/composables/useVirtualScroll";

interface I_SquareProps {
  className?: string;
  type?: string;
}

const SquareLively: React.FC<I_SquareProps> = ({ className = "", type = "default" }) => {
  const [numScroll, setNumScroll] = useState<number>(0);
  const squareRef = useRef<HTMLDivElement>(null);
  const { isInViewPort, visibilityChanged } = useVirtualScroll(); // cancel animation based on scroll when they not show in viewport

  useEffect(() => {
    const squareObserver = new IntersectionObserver((entries) => visibilityChanged(entries[0].isIntersecting));

    squareRef.current && squareObserver.observe(squareRef.current);

    const handleAnimation = () => {
      let lastScrollTop = 0;
      const delta = 5;
      requestAnimationFrame(() => {
        const nowScrollTop = window.scrollY;

        if (Math.abs(lastScrollTop - nowScrollTop) >= delta) {
          if (nowScrollTop > lastScrollTop) {
            setNumScroll((preNumScroll) => preNumScroll + 1);
          } else {
            setNumScroll((preNumScroll) => preNumScroll - 1);
          }
          lastScrollTop = nowScrollTop;
        }
      });
    };

    if (isInViewPort) {
      document.addEventListener("scroll", handleAnimation, { passive: true });
    } else {
      document.removeEventListener("scroll", handleAnimation);
    }

    return () => {
      squareObserver.disconnect();
      document.removeEventListener("scroll", handleAnimation);
    };
  }, [isInViewPort, visibilityChanged]);

  return (
    <div className={`${className} ${styles.squareLively}`} ref={squareRef}>
      <svg
        className={`${styles.squareLively_svg} ${styles[`_type__${type}`]}`}
        viewBox="0 0 502 502"
        style={{ transform: `rotate(${numScroll}deg)` }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect x="2" y="2" width="470" height="470" stroke="white" strokeWidth="4" strokeDasharray="4 5" />
        </g>
      </svg>
    </div>
  );
};

export default SquareLively;
