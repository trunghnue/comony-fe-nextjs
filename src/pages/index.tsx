import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import NewsList from "@/components/organisms/NewsList/NewsList";

interface Props {}

const inter = Inter({ subsets: ["latin"] });

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("🚀 ~ file: index.tsx:21 ~ Home:");
  return (
    <Layout>
      <DefaultLayout>
        <MainVisualVideo2 />
        <div className="animatedDirection -bottomToTop">
          <SectionContainer className="imageBoxAnimated" bgColor="black-gradient">
            <NewsList />
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
