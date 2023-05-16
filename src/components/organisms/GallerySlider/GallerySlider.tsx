import React from "react";
import styles from "./GallerySlider.module.scss";
import Link from "next/link";

interface GallerySliderProps {
  reverse?: boolean;
  sliders?: GallerySliderProps[];
  id?: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ id = "", reverse = false, sliders }) => {
  return (
    <div className={styles.gallerySlider}>
      <div id={id} className={styles.gallerySlider_wrapper}>
        <Link href="./"></Link>
      </div>
    </div>
  );
};

export default GallerySlider;
