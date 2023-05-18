import React, { useEffect, useMemo } from "react";
import styles from "./GallerySlider.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useCreateThumbnailPath } from "@/composables/useCreateThumbnailPath";
import CurvedImage from "@/components/atoms/Image/CurvedImage";

interface GallerySliderProps {
  className?: string;
  reverse?: boolean;
  sliders?: I_GallerySliderElement[];
  id?: string;
}
interface I_GallerySliderElement {
  id?: string;
  thumbnailUrl?: string;
  title?: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ className = "", id = "", reverse = false, sliders }) => {
  // ---------------- get avatar image path ----------------
  const { getSpaceThumbnailUrl } = useCreateThumbnailPath();
  const sliderList = useMemo(() => {
    if (sliders) {
      return [...sliders, ...sliders];
    }
  }, [sliders]);

  useEffect(() => {
    const slider = document.getElementById(id);
    // console.log("🚀 ~ file: GallerySlider.tsx:31 ~ slider:", slider);
    const link = document.getElementsByClassName(styles.gallerySlider_item);
    // console.log("🚀 ~ file: GallerySlider.tsx:33 ~ link:", link);

    // mouseEvents
    slider?.addEventListener("mousedown", (e) => {
      console.log("🚀 ~ file: GallerySlider.tsx:37 ~ e:", e);
    });
  }, [id]);

  return (
    <div className={`${className} ${styles.gallerySlider}`}>
      <div id={id} className={styles.gallerySlider_wrapper}>
        {sliderList?.map((item, index) => (
          <Link
            className={`${index === 0 ? (reverse ? styles.gallerySlider_reverse : styles.gallerySlider_first) : ""} ${
              styles.gallerySlider_item
            }`}
            key={index}
            href="./"
          >
            <CurvedImage path={getSpaceThumbnailUrl(item.thumbnailUrl) || ""} alt="" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;
