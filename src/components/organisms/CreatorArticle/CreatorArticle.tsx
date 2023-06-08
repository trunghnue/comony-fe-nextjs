import React, { useEffect, useRef } from "react";
import styles from "./CreatorArticle.module.scss";
import Link from "next/link";
import Image from "next/image";
import LinkText from "@/components/atoms/LinkText/LinkText";
import GalleryWithThumbnail, {
  I_GalleryWithThumbnailElement,
} from "@/components/molecules/GalleryWithThumbnail/GalleryWithThumbnail";

interface CreatorArticleProps {
  className?: string;
  backgroundPath: string;
  content?: string;
  heading?: string;
  imageList?: I_GalleryWithThumbnailElement[];
  link?: string;
  subHeading?: string;
  to?: string;
  onVisibilityChanged: (isVisible: boolean, entry: IntersectionObserverEntry) => void;
}

const CreatorArticle: React.FC<CreatorArticleProps> = ({
  className = "",
  backgroundPath = "",
  content = "",
  heading = "",
  imageList,
  link = "インタビューをもっと読む >",
  subHeading = "",
  to = "",
  onVisibilityChanged,
}) => {
  const creatorArticleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const creatorArticleObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const isVisible = entry.isIntersecting;
      if (isVisible) {
        onVisibilityChanged(isVisible, entry);
        creatorArticleObserver.unobserve(entry.target);
      }
    });

    creatorArticleRef.current && creatorArticleObserver.observe(creatorArticleRef.current);
  }, [onVisibilityChanged]);

  return (
    <article className={className} ref={creatorArticleRef}>
      <div className={`${styles.creatorArticle} slide-in-item`}>
        <div className={styles.creatorArticle_content}>
          <h3 className={styles.creatorArticle_content_heading}>{heading}</h3>
          <h4 className={styles.creatorArticle_content_subHeading}>{subHeading}</h4>
          <p className={styles.creatorArticle_content_text}>{content}</p>
          <LinkText
            className={styles.creatorArticle_content_link}
            link={to}
            value={link}
            fontSize="standard"
            color="white"
            underline
          />
        </div>
        <div className={styles.creatorArticle_thumbnail}>
          <GalleryWithThumbnail backgroundPath={backgroundPath} alt="img1" imageList={imageList} />
        </div>
      </div>
    </article>
  );
};

export default CreatorArticle;
