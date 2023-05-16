import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { SectionContainer } from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import styles from "./index.module.scss";
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
import { Video } from "@/components/atoms/Video/Video";
import { AnimatedBackground } from "@/components/atoms/AnimatedBackground/AnimatedBackground";
import ImageBox from "@/components/organisms/ImageBox/ImageBox";
import SquareLively from "@/components/atoms/LivelyIcon/SquareLively/SquareLively";
import FlashLively from "@/components/atoms/LivelyIcon/FlashLively/FlashLively";
import AppDownloadCTABanner from "@/components/organisms/CTABanner/AppDownloadCTABanner";
import GallerySlider from "@/components/organisms/GallerySlider/GallerySlider";

const { visibilityChangedArrows, maskTxtAnimation, handleScaleImage } = handleScroll();
const handleVisibilityChange = (entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
  const isVisible = entry.isIntersecting;
  if (isVisible) {
    visibilityChangedArrows(entry);
    observer.unobserve(entry.target);
  }
};
const headers = new Headers();
headers.set(process.env.NEXT_PUBLIC_API_KEY_NAME!, process.env.NEXT_PUBLIC_API_KEY_VALUE!);
headers.set(process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_NAME!, process.env.NEXT_PUBLIC_FRONT_SERVER_KEY_VALUE!);

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("🚀 ~ file: index.tsx:21 ~ Home _ props: ", _props);

  return (
    <DefaultLayout>
      <MainVisualVideo2 />
      <ArchitectBanner />
      <AnimatedBackground>
        <NewsList />
        <HeadingBlock1 />
        <VideoYoutube />
        <HeadingBlock2 />
        <ImageBox1 />
        <ImageBox2 />
        <ImageBox3 />
        <AppDownload />
        <HeadingBlock3 />
        <Gallery />
      </AnimatedBackground>
    </DefaultLayout>
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

const NewsList = () => {
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
        console.log("🚀 ~ file: index.tsx:125 ~ headers:", headers);

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

const HeadingBlock1 = () => {
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
            line1: t("video.title1"),
            line2: t("video.title2") || "",
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

const HeadingBlock2 = () => {
  const { t } = useTranslation("top");
  const commitmentBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commitmentBlockObserver: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], commitmentBlockObserver),
      { rootMargin: "50px" }
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
            line1: t("commitments.title1"),
            line2: t("commitments.title2") || "",
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
    const imageBox1Observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], imageBox1Observer), {
      rootMargin: "50px",
    });

    imageBox1Ref.current && imageBox1Observer.observe(imageBox1Ref.current);

    return () => {
      imageBox1Observer.disconnect();
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
      <SquareLively className={styles.imageBoxTop_squareIcon} />
    </div>
  );
};

const ImageBox2 = () => {
  const { t } = useTranslation("top");
  const imageBox2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageBox2Observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], imageBox2Observer), {
      rootMargin: "50px",
    });

    imageBox2Ref.current && imageBox2Observer.observe(imageBox2Ref.current);

    return () => {
      imageBox2Observer.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -bottomToTop" ref={imageBox2Ref}>
      <ImageBox
        id="image-box-2"
        className="imageBoxAnimated"
        position="left"
        src="/images/imageBox02.webp"
        number="2"
        title={t("commitments.boxTitle2") || ""}
        description={t("commitments.boxDescription2") || ""}
        onVisibilityChanged={handleScaleImage}
      />
    </div>
  );
};

const ImageBox3 = () => {
  const { t } = useTranslation("top");
  const imageBox3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageBox3Observer: IntersectionObserver = new IntersectionObserver((entries) => handleVisibilityChange(entries[0], imageBox3Observer), {
      rootMargin: "50px",
    });

    imageBox3Ref.current && imageBox3Observer.observe(imageBox3Ref.current);

    return () => {
      imageBox3Observer.disconnect();
    };
  }, []);
  return (
    <div className={styles.imageBoxBottom}>
      <div className="animatedDirection -bottomToTop" ref={imageBox3Ref}>
        <ImageBox
          id="image-box-3"
          className="imageBoxAnimated"
          position="right"
          src="/images/imageBox03.webp"
          number="3"
          title={t("commitments.boxTitle3") || ""}
          description={t("commitments.boxDescription3") || ""}
          onVisibilityChanged={handleScaleImage}
        />
      </div>
      <div className={styles.imageBoxBottom_flashIcon}>
        <FlashLively />
      </div>
    </div>
  );
};

const AppDownload = () => {
  const { t } = useTranslation("top");
  const appDownloadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const appDownloadObserver = new IntersectionObserver(
      (entries) => {
        handleVisibilityChange(entries[0], appDownloadObserver);
      },
      { rootMargin: "50px" }
    );
    appDownloadRef.current && appDownloadObserver.observe(appDownloadRef.current);

    return () => {
      appDownloadObserver.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -bottomToTop" ref={appDownloadRef}>
      <AppDownloadCTABanner className="imageBoxAnimated" image="CTABanner.webp" text={t("appDownloadCTABanner.title") || ""} />
    </div>
  );
};

const HeadingBlock3 = () => {
  const { t } = useTranslation("top");
  const headingBlock3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingBlock3Observer = new IntersectionObserver(
      (entries) => {
        handleVisibilityChange(entries[0], headingBlock3Observer);
      },
      { rootMargin: "50px" }
    );

    headingBlock3Ref.current && headingBlock3Observer.observe(headingBlock3Ref.current);

    return () => {
      headingBlock3Observer.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -right" ref={headingBlock3Ref}>
      <section className={`heading ${styles._position__right}`}>
        <SubHeadingBlock
          title={{ line1: t("gallery.title1"), line2: t("gallery.title2") || "" }}
          description={t("gallery.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

const Gallery = () => {
  console.log("process.env: ", process.env.NEXT_PUBLIC_API_URL);
  useEffect(() => {
    const fetchSpacelist = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spaces`, { headers });
      const data = await response.json();
      console.log("🚀 ~ file: index.tsx:432 ~ data:", data);
    };

    fetchSpacelist();
  }, []);
  return (
    <div className="animatedDirection -bottomToTop">
      <SectionContainer className={`${styles.gallery} imagedBoxAnimated`} bgColor="black-gradient" columns="1" fullWidth containerSize="full">
        <GallerySlider />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
