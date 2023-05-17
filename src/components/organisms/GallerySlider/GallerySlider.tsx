import React from "react";
import styles from "./GallerySlider.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useCreateThumbnailPath } from "@/composables/useCreateThumbnailPath";

interface GallerySliderProps {
  reverse?: boolean;
  sliders?: I_GallerySliderElement[];
  id?: string;
}
interface I_GallerySliderElement {
  id?: string;
  thumbnailUrl?: string;
  title?: string;
}

const GallerySlider: React.FC<GallerySliderProps> = ({ id = "", reverse = false, sliders }) => {
  console.log("🚀 ~ file: GallerySlider.tsx:16 ~ sliders:", sliders);
  const { getSpaceThumbnailUrl } = useCreateThumbnailPath();

  return (
    <div className={styles.gallerySlider}>
      <div id={id} className={styles.gallerySlider_wrapper}>
        {sliders?.map((item) => (
          <Link key={item.id} href="./">
            <Image src={getSpaceThumbnailUrl(item.thumbnailUrl) || ""} alt="" width={574} height={448} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;
