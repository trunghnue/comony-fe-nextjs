import "../styles/global.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "@/layouts/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
