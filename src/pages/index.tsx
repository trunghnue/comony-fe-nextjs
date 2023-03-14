import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layout";
import MainVisualVideo2 from "@/components/organisms/MainVisual/MainVisualVideo2";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <MainVisualVideo2 />
    </Layout>
  );
}
