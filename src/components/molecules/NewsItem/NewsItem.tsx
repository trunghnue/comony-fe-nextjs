import React, { useMemo } from "react";
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
  const classes = useMemo(() => {
    return styles[`_color__${linkColor}`];
  }, [linkColor]);

  const { getYmd } = dateFormat();
  return (
    <div className={`${className} ${styles.newsItem}`}>
      <div className={styles.newsItem_date}>{getYmd(dateItem)}</div>
      <Link className={`${styles.newsItem_link} ${classes}`} href={urlLink ? urlLink : `/news/${id}`} target={urlLink ? "_blank" : ""}>
        {content}
      </Link>
    </div>
  );
}
