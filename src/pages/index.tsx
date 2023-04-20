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
import React, { useEffect, useRef, useState } from "react";
import { handleScroll } from "@/utilities/scroll";
import Heading from "@/components/atoms/Heading/Heading";
import NewsItem from "@/components/molecules/NewsItem/NewsItem";
import { i18n, useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";
import { I_Get_News_Id_Response_Data, I_Newslist } from "@/types/schema/news";
import { SubHeadingBlock } from "@/components/molecules/SubHeadingBlock/SubHeadingBlock";

interface Props {}
const inter = Inter({ subsets: ["latin"] });
const { visibilityChangedArrows, maskTxtAnimation } = handleScroll();
const handleVisibilityChange = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
  const isVisible = entry.isIntersecting;
  if (isVisible) {
    visibilityChangedArrows(isVisible, entry);
    observer.unobserve(entry.target);
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
        <Video />
      </DefaultLayout>
    </Layout>
  );
}

const ArchitectBanner = (): JSX.Element => {
  const architectBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], observer));

    if (architectBannerRef.current) {
      observer.observe(architectBannerRef.current);
    }
    return () => {
      observer.disconnect();
    };
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
};

const NewList = (): JSX.Element => {
  const { t } = useTranslation("top");
  const [newsList, setNewsList] = useState<I_Get_News_Id_Response_Data[]>([]);
  const newListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], observer), {
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
};

const Video = (): JSX.Element => {
  const { t } = useTranslation("top");
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], observer));

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="animatedDirection -right" ref={videoRef}>
      <section className={`heading ${styles._position__right}`}>
        <SubHeadingBlock
          title={{ line1: t("video.title1"), line2: t("video.title2") || "" }}
          description={t("video.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
