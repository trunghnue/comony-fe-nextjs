import React from "react";
import styles from "./GalleryWithThumbnail.module.scss";
import Image from "next/image";
import CurvedImage from "@/components/atoms/Image/CurvedImage";

export interface I_GalleryWithThumbnailElement {
  title?: string;
  thumbnailUrl?: string;
}

interface GalleryWithThumbnailProps {
  alt: string;
  backgroundPath: string;
  imageList?: I_GalleryWithThumbnailElement[];
}

const GalleryWithThumbnail: React.FC<GalleryWithThumbnailProps> = ({ alt, backgroundPath, imageList }) => {
  console.log("🚀 ~ file: GalleryWithThumbnail.tsx:17 ~ imageList:", imageList);

  return (
    <div className={styles.galleryWithThumbnail}>
      <Image
        className={styles.galleryWithThumbnail_background}
        src={backgroundPath}
        alt={alt}
        width={522}
        height={522}
      />
      {imageList && (
        <div className={styles.galleryWithThumbnail_thumbnail}>
          {imageList.map((item, index) => (
            <CurvedImage
              key={index}
              className={styles.galleryWithThumbnail_thumbnail_item}
              alt={item.title || ""}
              path={item.thumbnailUrl || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryWithThumbnail;
