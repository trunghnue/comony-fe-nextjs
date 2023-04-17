import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { handleScroll } from "@/utilities/scroll";
import Heading from "@/components/atoms/Heading/Heading";
import NewsItem from "@/components/molecules/NewsItem/NewsItem";
import { i18n, useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";
import { I_Get_News_Id_Response_Data, I_Newslist } from "@/types/schema/news";

interface Props {}
const inter = Inter({ subsets: ["latin"] });
const { visibilityChangedArrows } = handleScroll();
const handleVisibilityChange = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  const isVisible = entries[0].isIntersecting;
  if (isVisible) {
    visibilityChangedArrows(isVisible, entries[0]);
    observer.unobserve(entries[0].target);
  }
};

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("🚀 ~ file: index.tsx:21 ~ Home:");

  return (
    <Layout>
      <DefaultLayout>
        <MainVisualVideo2 />
        <ArchitectBanner />
        <NewList />
        <HeadingBlock />
      </DefaultLayout>
    </Layout>
  );
}

function ArchitectBanner() {
  const architectBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries, observer));

    if (architectBannerRef.current) {
      observer.observe(architectBannerRef.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animatedDirection -bottomToTop" ref={architectBannerRef}>
      <section className={`${styles.architect} imageBoxAnimated`}>
        <Link href="/release/architect-seminar">
          <Image className={`${styles.architect_image} is-pc`} src="/images/architect/top-banner.webp" alt="top banner" width={1440} height={139} />
          <Image
            className={`${styles.architect_image} is-sp`}
            src="/images/architect/top-banner_sp.webp"
            alt="top banner sp"
            width={375}
            height={139}
          />
        </Link>
      </section>
    </div>
  );
}

function NewList() {
  const { t } = useTranslation("top");
  const [newsList, setNewsList] = useState<I_Get_News_Id_Response_Data[]>([]);
  const newListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries, observer), {
      rootMargin: "50px",
    });

    if (newListRef.current) {
      observer.observe(newListRef.current);
    }

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
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animatedDirection -bottomToTop" ref={newListRef}>
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
  );
}

function HeadingBlock() {
  return (
    <div className="animatedDirection -right">
      <section className={styles.heading_position__right}>SubHeadingBlock</section>
    </div>
  );
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
