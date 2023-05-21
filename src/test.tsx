import React, { useState, useEffect } from "react";
import styles from "./CurvedImage.module.scss";

interface I_CurvedImageProps {
  path: string;
  alt: string;
  size: string;
  type: string;
}

const CurvedImage: React.FC<I_CurvedImageProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = `${styles.curvedImage} ${styles["-type--" + props.type]}`;

  useEffect(() => {
    const handleLoad = (): void => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };

    return () => {
      setIsLoaded(false);
    };
  }, []);

  return (
    <div className={classes}>
      <img
        src={props.path}
        className={`${styles.curvedImage_image} ${isLoaded ? styles.curvedImage_show : ""}`}
        alt={props.alt}
        width="574"
        height="448"
        onLoad={handleLoad}
      />
      <div className={`${styles.curvedImage_skelton} ${!isLoaded ? styles.curvedImage_show : ""}`} />
    </div>
  );
};

export default CurvedImage;
