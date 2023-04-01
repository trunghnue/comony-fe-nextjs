import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "./index.module.scss";
import { I_Newslist } from "@/types/schema/news";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {}

const inter = Inter({ subsets: ["latin"] });

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const [newsList, setNewsList] = useState([]);

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
      const response = await fetch(`https://api.comony.net/news?${new URLSearchParams(params)}`, {
        headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("🚀 ~ file: index.tsx:28 ~ data:", data);
      setNewsList(data.data.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Layout>
      <MainVisualVideo2 />
      <div className={styles.newsList}>
        <h1 className={styles.newsList_header}>News</h1>
        <div className={styles.newsList_content}>
          {newsList &&
            newsList.map((news, index) => (
              <Link key={index} href="./">
                <p className={styles.newsList_item}>
                  <span className={styles.newsList_date}>{formatTime(news.publishedAt)}</span> {news.titleEn}
                </p>
              </Link>
            ))}
        </div>
        <div className={styles.newsList_footer}>
          <p>More</p>
        </div>
      </div>
    </Layout>
  );
}

const formatTime = (publishedAt: string) => {
  const dateString = publishedAt;
  const date = new Date(dateString);
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top"])),
  },
});
