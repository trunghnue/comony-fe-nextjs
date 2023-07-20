import React from "react";
import styles from "./CircleImage.module.scss";
import Image from "next/image";

interface CircleImageProps {
  path: string;
  size?: number;
  type?: string;
  borderColor?: "primary" | "secondary" | "gray" | "none";
  alt: string;
}

const CircleImage: React.FC<CircleImageProps> = (props) => {
  const classes = [styles.circleImage, styles["_type__" + props.type], styles["_borderColor__" + props.borderColor]]
    .filter(Boolean)
    .join(" ");
  const imageStyle = { height: props.size, width: props.size };

  return (
    <div className={classes} style={imageStyle}>
      <Image src={props.path} alt={props.alt} width={props.size} height={props.size} />
    </div>
  );
};

CircleImage.defaultProps = {
  alt: "",
  borderColor: "none",
  size: 280,
  type: "image",
};

export default CircleImage;
