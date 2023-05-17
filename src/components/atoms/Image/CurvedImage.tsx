import React from "react";
import styles from "./CurvedImage.module.scss";
import Image from "next/image";

interface I_CurvedImageProps {
  path: string;
  alt: string;
  type?: "default" | "gallery";
}

const CurvedImage: React.FC<I_CurvedImageProps> = ({ path, alt, type = "default" }) => {
  return (
    <div className={styles.curvedImage}>
      <Image src={path} alt={alt} width={574} height={448} />
    </div>
  );
};

export default CurvedImage;
