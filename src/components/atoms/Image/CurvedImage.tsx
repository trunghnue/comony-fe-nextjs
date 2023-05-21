import React from "react";
import styles from "./CurvedImage.module.scss";
import Image from "next/image";

interface I_CurvedImageProps {
  path: string;
  alt: string;
  type?: "default" | "gallery";
}

const CurvedImage: React.FC<I_CurvedImageProps> = ({ path, alt, type = "default" }) => {
  const classes = styles["_type__" + type];
  return (
    <div className={`${classes} ${styles.curvedImage}`}>
      <Image className={styles.curvedImage_image} src={path} alt={alt} width={574} height={448} />
      <div className={styles.curvedImage_skelton}></div>
    </div>
  );
};

export default CurvedImage;
