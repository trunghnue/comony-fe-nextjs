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

interface Props {}

const inter = Inter({ subsets: ["latin"] });

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  if (typeof window !== "undefined") {
    console.log("This code is running on the client");
  } else {
    console.log("This code is running on the server");
  }

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
      setNewsList(data.list);
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
        <h1>News</h1>
        <ul>
          {newsList &&
            newsList.map((news, index) => (
              <li key={index}>
                <p>{news.titleEn}</p>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top"])),
  },
});
