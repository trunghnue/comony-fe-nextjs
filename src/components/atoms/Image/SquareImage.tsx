import React from "react";
import styles from "./SquareImage.module.scss";
import Image from "next/image";

interface SquareImageProps {
  className: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  rounded?: "default" | "small" | "medium" | "xsmall";
}

const SquareImage: React.FC<SquareImageProps> = (props) => {
  const imageClasses = [props.className, styles.squareImage_image, styles["_rounded__" + props.rounded]]
    .filter(Boolean)
    .join(" ");
  const imageStyles = { height: props.width, width: props.height };

  return (
    <div className={styles.squareImage} style={imageStyles}>
      <Image className={imageClasses} src={props.path} alt={props.alt} width={props.width} height={props.height} />
    </div>
  );
};

SquareImage.defaultProps = {
  alt: "",
  height: 50,
  rounded: "default",
  width: 50,
};

export default SquareImage;
