import "../styles/global.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Layout from "@/layouts/layout";
import accessor from "@/plugins/axios-accessor";
import { AuthProvider } from "@/contexts/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  accessor();
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default appWithTranslation(App);
