import NewsItem from "@/components/molecules/NewsItem/NewsItem";
import React, { useEffect, useState } from "react";
import styles from "./NewsList.module.scss";
import { I_Get_News_Id_Response_Data, I_Newslist } from "@/types/schema/news";
import { i18n, useTranslation } from "next-i18next";
import Heading from "@/components/atoms/Heading/Heading";
import LinkText from "@/components/atoms/LinkText/LinkText";

export default function NewsList() {
  // console.log("🚀 ~ file: NewsList.tsx:10 ~ NewsList:");
  const { t } = useTranslation("top");
  const [newsList, setNewsList] = useState<I_Get_News_Id_Response_Data[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchNews = async () => {
      const params: I_Newslist = {
        direction: "DESC",
        limit: 3,
        page: 1,
        sort: "publishedAt",
      };

      const headers = {
        "x-comony-api": "true",
        "x-api-key": "OiIxNTJDNjZBMS1EOTRBLTQ5QjItQUVGQi03QjE3QTlEQkFERjUifQ",
      };

      try {
        const queryParams = Object.entries(params)
          .reduce((acc, [key, value]) => {
            return `${acc}&${key}=${value}`;
          }, "")
          .slice(1); // to get string: direction=DESC&limit=3&page=1&sort=publishedAt

        const response = await fetch(`https://api.comony.net/news?${new URLSearchParams(queryParams)}`, {
          headers,
          signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        setNewsList(res.data.list);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchNews();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={styles.newsList}>
      <Heading level="2" align="left" fontWeight="700" headings={[{ text: "News", color: "white", spBreak: false }]} />
      <div className={styles.newsList_contents}>
        {newsList.length > 0 &&
          newsList.map((item) => (
            <NewsItem
              className={styles.newsList_item}
              id={item.id}
              key={item.id}
              urlLink={item.newsUrl}
              content={i18n?.language === "en" ? item.titleEn : item.title}
              dateItem={item.publishedAt}
            />
          ))}
      </div>
      <LinkText color="white" link="/news" underline value={t("newsListLink")} fontSize="standard"></LinkText>
    </div>
  );
}
