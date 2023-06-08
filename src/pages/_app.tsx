import "../styles/global.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "@/layouts/layout";

const App = ({ Component, pageProps }: AppProps) => {
  console.log("🚀 ~ file: _app.tsx:7 ~ pageProps:", pageProps);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
