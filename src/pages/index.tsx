import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "./index.module.scss";
import { I_Get_News_Id_Response_Data, I_Newslist } from "@/types/schema/news";
import { useEffect, useState } from "react";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import Heading from "@/components/atoms/Heading/Heading";
import NewsItem from "@/components/molecules/NewsItem/NewsItem";
import { i18n, useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";

interface Props {}

const inter = Inter({ subsets: ["latin"] });

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("top");

  const [newsList, setNewsList] = useState<I_Get_News_Id_Response_Data[]>([]);

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
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      // console.log("🚀 ~ file: index.tsx:44 ~ res:", res);
      setNewsList(res.data.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Layout>
      <DefaultLayout>
        <MainVisualVideo2 />
        <div className="animatedDirection -bottomToTop">
          <SectionContainer className="imageBoxAnimated" bgColor="black-gradient">
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
          </SectionContainer>
        </div>
      </DefaultLayout>
    </Layout>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
