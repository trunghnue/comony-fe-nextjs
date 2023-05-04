import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { SectionContainer } from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { handleScroll } from "@/utilities/scroll";
import Heading from "@/components/atoms/Heading/Heading";
import NewsItem from "@/components/molecules/NewsItem/NewsItem";
import { i18n, useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";
import { I_Get_News_Id_Response_Data, I_Newslist } from "@/types/schema/news";
import { SubHeadingBlock } from "@/components/molecules/SubHeadingBlock/SubHeadingBlock";
import { Video } from "@/components/atoms/Video/Video";
import { AnimatedBackground } from "@/components/atoms/AnimatedBackground/AnimatedBackground";
import ImageBox from "@/components/organisms/ImageBox/ImageBox";

interface Props {}
const inter = Inter({ subsets: ["latin"] });
const { visibilityChangedArrows, maskTxtAnimation, handleScaleImage } = handleScroll();
const handleVisibilityChange = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
  const isVisible = entry.isIntersecting;
  if (isVisible) {
    visibilityChangedArrows(entry);
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
        <AnimatedBackground>
          <NewList />
          <HeadingBlock />
          <VideoYoutube />
          <CommitmentsBlock />
          <ImageBox1 />
        </AnimatedBackground>
      </DefaultLayout>
    </Layout>
  );
}

const ArchitectBanner = () => {
  const architectBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const architectBannerObserver: IntersectionObserver = new IntersectionObserver((entries) =>
      handleVisibilityChange(entries[0], architectBannerObserver)
    );

    architectBannerRef.current && architectBannerObserver.observe(architectBannerRef.current);

    return () => {
      architectBannerObserver.disconnect();
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

const NewList = () => {
  const { t } = useTranslation("top");
  const [newsList, setNewsList] = useState<I_Get_News_Id_Response_Data[]>([]);
  const newListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newListObserver: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], newListObserver), {
      rootMargin: "50px",
    });

    newListRef.current && newListObserver.observe(newListRef.current);

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
      newListObserver.disconnect();
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

const HeadingBlock = () => {
  const { t } = useTranslation("top");
  const headingBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingBlockObserver: IntersectionObserver = new IntersectionObserver((entries) =>
      handleVisibilityChange(entries[0], headingBlockObserver)
    );

    headingBlockRef.current && headingBlockObserver.observe(headingBlockRef.current);

    return () => {
      headingBlockObserver.disconnect();
    };
  }, []);

  return (
    <div className="animatedDirection -right" ref={headingBlockRef}>
      <section className={`heading ${styles._position__right}`}>
        <SubHeadingBlock
          title={{
            line1a: t("video.title1a"),
            line1b: t("video.title1b") || "",
            line2: { text: t("video.title2") || "", isYellow: i18n?.language === "en" ? false : true },
          }}
          description={t("video.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

const VideoYoutube = () => {
  const videoYoutubeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const videoYoutubeObserver: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], videoYoutubeObserver),
      {
        rootMargin: "50px",
      }
    );

    videoYoutubeRef.current && videoYoutubeObserver.observe(videoYoutubeRef.current);

    return () => {
      videoYoutubeObserver.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -bottomToTop" ref={videoYoutubeRef}>
      <SectionContainer className="imageBoxAnimated" bgColor="black-gradient">
        <Video width="100%" height="auto" src="https://www.youtube.com/embed/KiDb39pXl1s" />
      </SectionContainer>
    </div>
  );
};

const CommitmentsBlock = () => {
  const { t } = useTranslation("top");
  const commitmentBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commitmentBlockObserver: IntersectionObserver = new IntersectionObserver((entries) =>
      handleVisibilityChange(entries[0], commitmentBlockObserver)
    );

    commitmentBlockRef.current && commitmentBlockObserver.observe(commitmentBlockRef.current);

    return () => {
      commitmentBlockObserver.disconnect();
    };
  }, []);

  return (
    <div className="animatedDirection -left" ref={commitmentBlockRef}>
      <section className={`heading ${styles._position__left}`}>
        <SubHeadingBlock
          position="left"
          title={{
            line1a: t("commitments.title1"),
            line2: { text: t("commitments.title2") || "", isYellow: true },
          }}
          description={t("commitments.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

const ImageBox1 = () => {
  const { t } = useTranslation("top");
  const imageBox1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageBox1_Observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], imageBox1_Observer));

    imageBox1Ref.current && imageBox1_Observer.observe(imageBox1Ref.current);

    return () => {
      imageBox1_Observer.disconnect();
    };
  }, []);
  return (
    <div className={styles.imageBoxTop}>
      <div className="animatedDirection -bottomToTop" ref={imageBox1Ref}>
        <ImageBox
          id="image-box-1"
          className="imageBoxAnimated"
          position="right"
          src="/images/imageBox01.webp"
          number="1"
          title={t("commitments.boxTitle1") || ""}
          description={t("commitments.boxDescription1") || ""}
          onVisibilityChanged={handleScaleImage}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
