import React from "react";
import styles from "./NewsItem.module.scss";
import Link from "next/link";
import { dateFormat } from "@/utilities/dateFormat";

interface NewsItemProps {
  dateItem: string;
  content?: string;
  id?: string;
  urlLink?: string;
  linkColor?: "white" | "primary" | "secondary";
  className?: string;
}

export default function NewsItem({ dateItem, content = "", id = "", urlLink = "", linkColor = "white", className = "" }: NewsItemProps) {
  const { getYmd } = dateFormat();
  return (
    <div className={`${styles.newsItem} ${className}`}>
      <div className={styles.newsItem_date}>{getYmd(dateItem)}</div>
      <Link
        className={`${styles.newsItem_link} ${styles[`_color__${linkColor}`]}`}
        href={urlLink ? urlLink : `/news/${id}`}
        target={urlLink ? "_blank" : ""}
      >
        {content}
      </Link>
    </div>
  );
}
