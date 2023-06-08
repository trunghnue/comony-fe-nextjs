import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
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
import SubHeadingBlock from "@/components/molecules/SubHeadingBlock/SubHeadingBlock";
import Video from "@/components/atoms/Video/Video";
import AnimatedBackground from "@/components/atoms/AnimatedBackground/AnimatedBackground";
import ImageBox from "@/components/organisms/ImageBox/ImageBox";
import SquareLively from "@/components/atoms/LivelyIcon/SquareLively/SquareLively";
import FlashLively from "@/components/atoms/LivelyIcon/FlashLively/FlashLively";
import AppDownloadCTABanner from "@/components/organisms/CTABanner/AppDownloadCTABanner";
import GallerySlider from "@/components/organisms/GallerySlider/GallerySlider";
import { I_SpaceListDTO, I_SpaceListRequest } from "@/types/schema/spaces";
import { publishedStatusId } from "@/constants/spaces";
import CreatorArticle from "@/components/organisms/CreatorArticle/CreatorArticle";

const { visibilityChangedArrows, maskTxtAnimation, handleScaleImage, slideItems } = handleScroll();
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
const formatParams = (params: any) => {
  // to get string: direction=DESC&limit=3&page=1&sort=publishedAt
  return Object.entries(params)
    .reduce((acc, [key, value]) => {
      return `${acc}&${key}=${value}`;
    }, "")
    .slice(1);
};

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
        <HeadingBlock4 />
        <CreatorBanner />
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
          <Image
            className={`${styles.architect_image} is-pc`}
            src="/images/architect/top-banner.webp"
            alt="top banner"
            width={1440}
            height={139}
          />
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
    const newListObserver: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], newListObserver),
      {
        rootMargin: "50px",
      }
    );

    newListRef.current && newListObserver.observe(newListRef.current);

    const controller = new AbortController();
    const fetchNews = async () => {
      const params: I_Newslist = {
        direction: "DESC",
        limit: 3,
        page: 1,
        sort: "publishedAt",
      };

      try {
        const queryParams = formatParams(params);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news?${new URLSearchParams(queryParams)}`, {
          headers,
          signal: controller.signal,
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
          <Heading
            level="2"
            align="left"
            fontWeight="700"
            headings={[{ text: "News", color: "white", spBreak: false }]}
          />
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
    const imageBox1Observer: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], imageBox1Observer),
      {
        rootMargin: "50px",
      }
    );

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
    const imageBox2Observer: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], imageBox2Observer),
      {
        rootMargin: "50px",
      }
    );

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
    const imageBox3Observer: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], imageBox3Observer),
      {
        rootMargin: "50px",
      }
    );

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
      <AppDownloadCTABanner
        className="imageBoxAnimated"
        image="CTABanner.webp"
        text={t("appDownloadCTABanner.title") || ""}
      />
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
  const [spaceList, setSpaceList] = useState<I_SpaceListDTO[]>([]);
  const { t } = useTranslation("top");
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spacesParams: I_SpaceListRequest = {
      direction: "DESC",
      isRandom: 1,
      limit: 15,
      page: 0,
      publishedStatus: publishedStatusId.OPEN,
    };
    const controller = new AbortController();
    const fetchSpacelist = async () => {
      try {
        const queryParams = formatParams(spacesParams);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/spaces?${new URLSearchParams(queryParams)}`, {
          headers,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        // console.log("🚀 ~ file: index.tsx:432 ~ data:", res);
        setSpaceList(res.data.list);
      } catch (error) {
        throw error;
      }
    };

    const galleryObserver = new IntersectionObserver(
      (entries) => {
        handleVisibilityChange(entries[0], galleryObserver);
      },
      { rootMargin: "50px" }
    );

    galleryRef.current && galleryObserver.observe(galleryRef.current);

    fetchSpacelist();

    return () => {
      galleryObserver.disconnect();
      controller.abort();
    };
  }, []);

  return (
    <div className="animatedDirection -bottomToTop" ref={galleryRef}>
      <SectionContainer
        className={`imageBoxAnimated ${styles.gallery}`}
        bgColor="black-gradient"
        columns="1"
        fullWidth
        containerSize="full"
      >
        {spaceList.length > 0 && (
          <GallerySlider id="gallery_top" className={styles.gallery_top} sliders={spaceList.slice(0, 5)} />
        )}
        {spaceList.length > 0 && (
          <GallerySlider
            id="gallery_center"
            className={styles.gallery_center}
            sliders={spaceList.slice(5, 10)}
            reverse
          />
        )}
        {spaceList.length > 0 && (
          <GallerySlider id="gallery_bottom" className={styles.gallery_bottom} sliders={spaceList.slice(10)} />
        )}
        <LinkText color="white" link="./spaces" underline value={t("spaceListLink")} fontSize="standard" />
      </SectionContainer>
    </div>
  );
};

const HeadingBlock4 = () => {
  const { t } = useTranslation("top");
  const headingBlock4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingBlock4Observer: IntersectionObserver = new IntersectionObserver(
      (entries) => handleVisibilityChange(entries[0], headingBlock4Observer),
      { rootMargin: "50px" }
    );

    headingBlock4Ref.current && headingBlock4Observer.observe(headingBlock4Ref.current);

    return () => {
      headingBlock4Observer.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -left" ref={headingBlock4Ref}>
      <section className={`heading ${styles._position__left}`}>
        <SubHeadingBlock
          position="right"
          title={{ line1: t("creatorsTop.title1"), line2: t("creatorsTop.title2") || "" }}
          description={t("creatorsTop.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

const CreatorBanner = () => {
  const { t } = useTranslation("top");
  const creatorBannerRef = useRef<HTMLDivElement>(null);
  const creatorImages = [
    { thumbnailUrl: "/images/creator/01/image_02_sm.webp", title: "image2" },
    { thumbnailUrl: "/images/creator/01/image_01_sm.webp", title: "image1" },
    { thumbnailUrl: "/images/creator/01/image_03_sm.webp", title: "image3" },
    { thumbnailUrl: "/images/creator/01/image_04_sm.webp", title: "image4" },
  ];

  const creatorImages2 = [
    { thumbnailUrl: "/images/creator/02/image_01_sm.webp", title: "image1" },
    { thumbnailUrl: "/images/creator/02/image_02_sm.webp", title: "image2" },
    { thumbnailUrl: "/images/creator/02/image_03_sm.webp", title: "image3" },
    { thumbnailUrl: "/images/creator/02/image_04_sm.webp", title: "image4" },
  ];

  useEffect(() => {
    const creatorBannerObserver = new IntersectionObserver((entries) => {
      handleVisibilityChange(entries[0], creatorBannerObserver);
    });
    creatorBannerRef.current && creatorBannerObserver.observe(creatorBannerRef.current);
    return () => {
      creatorBannerObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.creatorBanner}>
      <div className="animatedDirection -bottomToTop" ref={creatorBannerRef}>
        <SectionContainer
          className="imageBoxAnimated"
          bgColor="black-gradient"
          containerSize="full"
          columns="1"
          position="left"
        >
          <CreatorArticle
            className={styles.creatorSection_item}
            backgroundPath="/images/gallery_bg1.webp"
            imageList={creatorImages}
            to="./interview-takahito-yamada"
            heading={t("creatorsTop.first.name") || ""}
            subHeading={t("creatorsTop.first.company") || ""}
            content={t("creatorsTop.first.description") || ""}
            link={t("creatorsTop.readMore") || ""}
            onVisibilityChanged={slideItems}
          />
          <CreatorArticle
            className={styles.creatorSection_item}
            backgroundPath="/images/gallery_bg2.webp"
            imageList={creatorImages2}
            to="./interview-daiki-kato"
            heading={t("creatorsTop.second.name") || ""}
            subHeading={t("creatorsTop.second.company") || ""}
            content={t("creatorsTop.second.description") || ""}
            link={t("creatorsTop.readMore") || ""}
            onVisibilityChanged={slideItems}
          />
        </SectionContainer>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
