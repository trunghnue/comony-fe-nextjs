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
import FigureCaptionList from "@/components/organisms/FigureCaptionList/FigureCaptionList";
import FAQ from "@/components/organisms/FAQ/FAQ";
import ForCreatorBusinessCTABanner from "@/components/organisms/CTABanner/ForCreatorBusinessCTABanner";
import CircleLively from "@/components/atoms/LivelyIcon/CircleLively/CircleLively";
import { useVisible } from "@/composables/useVisible";

const { visibilityChangedArrows, maskTxtAnimation, handleScaleImage, slideItems } = handleScroll();
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
const createObserver = (ref: React.RefObject<HTMLDivElement>, rootMargin = "0px") => {
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const isVisible = entry.isIntersecting;
      if (isVisible) {
        visibilityChangedArrows(entry);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: rootMargin }
  );

  ref.current && observer.observe(ref.current);

  return observer;
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
        <HeadingBlock5 />
        <FigureCaption />
        <FAQGroup />
        <CTABannerCreator />
      </AnimatedBackground>
    </DefaultLayout>
  );
}

const ArchitectBanner = () => {
  const architectBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const architectBannerObserver = createObserver(architectBannerRef);

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
    const newListObserver = createObserver(newListRef, "50px");

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
  const headingBlock1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingBlock1Observer = createObserver(headingBlock1Ref);

    return () => {
      headingBlock1Observer.disconnect();
    };
  }, []);

  return (
    <div className="animatedDirection -right" ref={headingBlock1Ref}>
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
    const videoYoutubeObserver = createObserver(videoYoutubeRef, "50px");

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
    const commitmentBlockObserver = createObserver(commitmentBlockRef, "50px");

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
    const imageBox1Observer = createObserver(imageBox1Ref, "50px");

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
    const imageBox2Observer = createObserver(imageBox2Ref, "50px");

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
    const imageBox3Observer = createObserver(imageBox3Ref, "50px");

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
    const appDownloadObserver = createObserver(appDownloadRef, "50px");

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
    const headingBlock3Observer = createObserver(headingBlock3Ref, "50px");

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

    const galleryObserver = createObserver(galleryRef, "50px");

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
    const headingBlock4Observer = createObserver(headingBlock4Ref, "50px");

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
  const appDownloadRef = useRef<HTMLDivElement>(null);
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
    const creatorBannerObserver = createObserver(creatorBannerRef, "50px");
    const appDownloadObserver = createObserver(appDownloadRef, "50px");

    return () => {
      creatorBannerObserver.disconnect();
      appDownloadObserver.disconnect();
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
      <SquareLively className={styles.creatorBanner_squareIcon} />
      <div className="animatedDirection -bottomToTop" ref={appDownloadRef}>
        <AppDownloadCTABanner
          className="imageBoxAnimated"
          image="CTABanner.webp"
          text={t("appDownloadCTABanner.title") || ""}
          link="./spaces"
        />
      </div>
    </div>
  );
};

const HeadingBlock5 = () => {
  const { t } = useTranslation("top");
  const headingBlock5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingBlock5Observer = createObserver(headingBlock5Ref, "50px");

    return () => {
      headingBlock5Observer.disconnect();
    };
  }, []);
  return (
    <div className="animatedDirection -left" ref={headingBlock5Ref}>
      <section className={`heading ${styles._position__left}`}>
        <SubHeadingBlock
          position="right"
          title={{ line1: t("figure.title1"), line2: t("figure.title2") || "" }}
          description={t("figure.description") || ""}
          onVisibilityChanged={maskTxtAnimation}
        />
      </section>
    </div>
  );
};

const FigureCaption = () => {
  const { t } = useTranslation("top");
  const figureRef = useRef<HTMLDivElement>(null);
  const figureCaptionList = [
    {
      image: "figureCaptionItem1.webp",
      text: t("figure.boxDescription1"),
      title: t("figure.boxTitle1"),
    },
    {
      image: "figureCaptionItem2.webp",
      text: t("figure.boxDescription2"),
      title: t("figure.boxTitle2"),
    },
    {
      image: "figureCaptionItem3.webp",
      text: t("figure.boxDescription3"),
      title: t("figure.boxTitle3"),
    },
  ];
  useEffect(() => {
    const figureObserver = createObserver(figureRef, "50px");

    return () => {
      figureObserver.disconnect();
    };
  });
  return (
    <div className="animatedDirection -bottomToTop" ref={figureRef}>
      <FigureCaptionList
        className="imageBoxAnimated"
        figureCaptionList={figureCaptionList}
        isScroll
        onVisibilityChanged={slideItems}
      />
    </div>
  );
};

const FAQGroup = () => {
  const { t } = useTranslation("top");
  const headingRef = useRef<HTMLDivElement>(null);
  const faqGroupRef = useRef<HTMLDivElement>(null);
  const faqList = [
    {
      answer: t("faqTop.first.answer"),
      question: t("faqTop.first.question"),
    },
    {
      answer: t("faqTop.second.answer"),
      question: t("faqTop.second.question"),
    },
    {
      answer: t("faqTop.third.answer"),
      question: t("faqTop.third.question"),
    },
  ];
  const slideFAQ = (
    isVisible: boolean,
    entry: IntersectionObserverEntry,
    delayTime: number,
    classes = "is-active--according"
  ) => {
    return slideItems(isVisible, entry, delayTime, classes);
  };

  useEffect(() => {
    const headingObserver = createObserver(headingRef, "50px");
    const faqGroupObserver = createObserver(faqGroupRef, "100px");

    return () => {
      headingObserver.disconnect();
      faqGroupObserver.disconnect();
    };
  }, []);
  return (
    <div className={styles.faqGroup}>
      <div className="animatedDirection -left" ref={headingRef}>
        <section className={`heading ${styles._position__left}`}>
          <SubHeadingBlock
            position="right"
            title={{ line1: "FAQ" }}
            description={t("faqTop.description") || ""}
            onVisibilityChanged={maskTxtAnimation}
          />
        </section>
      </div>
      <div className={styles.faqGroup_section}>
        <div className="animatedDirection -bottomToTop" ref={faqGroupRef}>
          <SectionContainer
            className="imageBoxAnimated"
            bgColor="black-gradient"
            columns="1"
            containerSize="lg"
            position="left"
            fullWidth
          >
            <FAQ isScroll listItem={faqList} bgColor="transparent" visibilityChanged={slideFAQ} />
          </SectionContainer>
        </div>
      </div>
    </div>
  );
};

const CTABannerCreator = () => {
  const { t } = useTranslation("top");
  const creatorRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const { visibleChangedCircle, visibilityChangedCircle } = useVisible();

  useEffect(() => {
    const creatorObserver = createObserver(creatorRef, "100px");
    creatorRef.current && creatorObserver.observe(creatorRef.current);

    const businessObserver = createObserver(businessRef, "100px");
    businessRef.current && businessObserver.observe(businessRef.current);

    const circleObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const isVisible = entry.isIntersecting;
      if (isVisible) {
        visibilityChangedCircle(isVisible);
        circleObserver.unobserve(entry.target);
      }
    });
    circleRef.current && circleObserver.observe(circleRef.current);

    return () => {
      creatorObserver.disconnect();
      businessObserver.disconnect();
      circleObserver.disconnect();
    };
  }, [visibilityChangedCircle]);

  return (
    <div className={styles.ctaBannerCreator}>
      <div className="animatedDirection -bottomToTop" ref={creatorRef}>
        <ForCreatorBusinessCTABanner
          className="imageBoxAnimated"
          link="./creator"
          image="creator/heroImageSection_creator.webp"
          title={t("forCreatorBusinessCTABanner.title1") || ""}
          buttonLabel={t("forCreatorBusinessCTABanner.button1") || ""}
          description={t("forCreatorBusinessCTABanner.description1") || ""}
        />
      </div>
      <div className="animatedDirection -bottomToTop" ref={businessRef}>
        <ForCreatorBusinessCTABanner
          className="imageBoxAnimated"
          link="./business"
          image="business/banner.webp"
          title={t("forCreatorBusinessCTABanner.title2") || ""}
          buttonLabel={t("forCreatorBusinessCTABanner.button2") || ""}
          description={t("forCreatorBusinessCTABanner.description2") || ""}
        />
      </div>
      <div>
        <div className={styles.ctaBannerCreator_flashIcon}>
          <FlashLively />
        </div>
        <CircleLively
          className={styles.ctaBannerCreator_circleLively}
          visibleAnimated={visibleChangedCircle}
          ref={circleRef}
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
