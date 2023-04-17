import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import NewsList from "@/components/organisms/NewsList/NewsList";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { handleScroll } from "@/utilities/scroll";

interface Props {}

const inter = Inter({ subsets: ["latin"] });

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("🚀 ~ file: index.tsx:21 ~ Home:");
  const architectBannerRef = useRef<HTMLDivElement>(null);
  const newsListRef = useRef<HTMLDivElement>(null);
  const { visibilityChangedArrows } = handleScroll();
  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      const isVisible = entries[0].isIntersecting;
      if (isVisible) {
        visibilityChangedArrows(isVisible, entries[0]);
        observer.unobserve(entries[0].target);
      }
    };
    const observer = new IntersectionObserver(handleVisibilityChange);
    if (architectBannerRef.current) {
      observer.observe(architectBannerRef.current);
    }
    if (newsListRef.current) {
      observer.observe(newsListRef.current);
    }
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <DefaultLayout>
        <MainVisualVideo2 />
        <div className="animatedDirection -bottomToTop" ref={architectBannerRef}>
          <ArchitectBanner />
        </div>
        <div className="animatedDirection -bottomToTop" ref={newsListRef}>
          <SectionContainer className="imageBoxAnimated" bgColor="black-gradient">
            <NewsList />
          </SectionContainer>
        </div>
      </DefaultLayout>
    </Layout>
  );
}

function ArchitectBanner() {
  return (
    <div>
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

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "top", "downloads"])),
  },
});
