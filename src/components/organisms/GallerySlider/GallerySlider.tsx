import React, { useEffect, useMemo, useRef } from "react";
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
  const sliderList = useMemo(() => {
    if (sliders) {
      return [...sliders, ...sliders];
    }
  }, [sliders]);
  const sliderRef = useRef<HTMLDivElement>(null);

  // ---------------- get avatar image path ----------------
  const { getSpaceThumbnailUrl } = useCreateThumbnailPath();

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    const link = document.querySelectorAll(`.${styles.gallerySlider_item}`);

    /**
     * prevent click link when moving slider
     * @items: <NodeListOf<Element> | list of slider item
     */
    const preventClick = (items: NodeListOf<Element> | null) => {
      items?.forEach((item) => {
        item.classList.add(styles.prevent);
      });
    };

    /**
     * allow click link after mouse move
     * @items: <NodeListOf<Element> | list of slider item
     */
    const allowClick = (items: NodeListOf<Element> | null) => {
      items?.forEach((item) => {
        item.classList.remove(styles.prevent);
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      const pageX = e.pageX;
      startX = pageX - slider!.offsetLeft;
      console.log("🚀 ~ file: GallerySlider.tsx:62 ~ slider!.offsetLeft:", slider!.offsetLeft);
      scrollLeft = slider!.scrollLeft;
      console.log("🚀 ~ file: GallerySlider.tsx:63 ~ scrollLeft:", scrollLeft);
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
      allowClick(link);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = e.pageX - slider!.offsetLeft;
      // console.log("🚀 ~ file: GallerySlider.tsx:82 ~ e.pageX:", e.pageX);
      const deviation = x - startX;
      console.log("🚀 ~ file: GallerySlider.tsx:85 ~ deviation:", deviation);
      slider!.scrollLeft = scrollLeft - deviation;
      console.log("🚀 ~ file: GallerySlider.tsx:87 ~ slider!.scrollLeft:", slider!.scrollLeft);
      preventClick(link);
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].clientX - slider!.offsetLeft;
      scrollLeft = slider!.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    const handleTouchCancel = () => {
      isDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = e.touches[0].clientX - slider!.offsetLeft;
      const deviation = x - startX;
      slider!.scrollLeft = scrollLeft - deviation;
    };

    slider!.addEventListener("mousedown", handleMouseDown);
    slider!.addEventListener("mouseleave", handleMouseLeave);
    slider!.addEventListener("mouseup", handleMouseUp);
    slider!.addEventListener("mousemove", handleMouseMove);

    slider!.addEventListener("touchstart", handleTouchStart);
    slider!.addEventListener("touchend", handleTouchEnd);
    slider!.addEventListener("touchcancel", handleTouchCancel);
    slider!.addEventListener("touchmove", handleTouchMove);

    return () => {
      slider!.removeEventListener("mousedown", handleMouseDown);
      slider!.removeEventListener("mouseleave", handleMouseLeave);
      slider!.removeEventListener("mouseup", handleMouseUp);
      slider!.removeEventListener("mousemove", handleMouseMove);

      slider!.removeEventListener("touchstart", handleTouchStart);
      slider!.removeEventListener("touchend", handleTouchEnd);
      slider!.removeEventListener("touchcancel", handleTouchCancel);
      slider!.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className={`${className} ${styles.gallerySlider}`}>
      <div id={id} className={styles.gallerySlider_wrapper} ref={sliderRef}>
        {sliderList?.map((item, index) => (
          <Link
            className={`${styles.gallerySlider_item} ${
              index === 0 ? (reverse ? styles.gallerySlider_reverse : styles.gallerySlider_first) : ""
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
