import "../styles/global.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "@/layouts/layout";
import accessor from "@/plugins/axios-accessor";

const App = ({ Component, pageProps }: AppProps) => {
  accessor();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default appWithTranslation(App);
