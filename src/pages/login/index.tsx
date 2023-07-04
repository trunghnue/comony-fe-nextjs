import Card from "@/components/atoms/Card/Card";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import styles from "./index.module.scss";
import { useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";

const Login = () => {
  const { t } = useTranslation("login");

  return (
    <DefaultLayout bgColor="gray">
      <SectionContainer bgColor="gray" columns="1" position="left" wrapSize="large">
        <div className={styles.loginTemp}>
          <Card widthSize="small">
            <Card.Title>
              <h1 className={styles.loginTemp_heading}>{t("login.heading")}</h1>
            </Card.Title>
            <Card.Subtitle>
              {t("login.subtext1")}
              <LinkText color="secondary" link="/register" value={t("login.subtext2")} />
            </Card.Subtitle>
            <Card.Body>
              <div className={styles.loginTemp_toPassChange}>
                <LinkText link="./pass_reminds-step1" color="secondary" value={t("login.resetting")} />
              </div>
            </Card.Body>
          </Card>
        </div>
      </SectionContainer>
    </DefaultLayout>
  );
};

export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "login"])),
  },
});
