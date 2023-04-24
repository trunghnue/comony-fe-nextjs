import React, { useEffect, useRef, useState } from "react";
import styles from "./AnimatedBackground.module.scss";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  const [particleSmall, setParticleSmall] = useState<number>(0);
  const [particleMedium, setParticleMedium] = useState<number>(0);
  const [particleLarge, setParticleLarge] = useState<number>(0);
  const particleSmallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnimation = () => {
      requestAnimationFrame(() => {
        let numParticleTop = 0;
        const elm: HTMLElement | null = particleSmallRef.current;

        if (elm) {
          numParticleTop = elm.offsetTop;
        }
        const value = window.scrollY;

        setParticleSmall(numParticleTop + value / 2);
        setParticleMedium(numParticleTop + value / 4);
        setParticleLarge(numParticleTop + value / 8);
      });
    };
    if (typeof window !== "undefined") {
      document.addEventListener("scroll", handleAnimation, { passive: true });
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("scroll", handleAnimation);
      }
    };
  }, []);

  return (
    <div className={styles.animatedBackground}>
      <div
        ref={particleSmallRef}
        className={`${styles.animatedBackground_particle} ${styles.animatedBackground_particleSmall} is-pc`}
        style={{ transform: `translate3d(0px, -${particleSmall}px, 0px)` }}
      />
      <div
        className={`${styles.animatedBackground_particle} ${styles.animatedBackground_particleMedium}`}
        style={{ transform: `translate3d(0px, -${particleMedium}px, 0px)` }}
      />
      <div
        className={`${styles.animatedBackground_particle} ${styles.animatedBackground_particleLarge}`}
        style={{ transform: `translate3d(0px, -${particleLarge}px, 0px)` }}
      />
      <div className={styles.animatedBackground_content}>{children}</div>
    </div>
  );
};
