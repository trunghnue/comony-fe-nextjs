import Card from "@/components/atoms/Card/Card";
import SectionContainer from "@/components/atoms/SectionContainer/SectionContainer";
import DefaultLayout from "@/components/organisms/Layout/DefaultLayout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "next-i18next";
import LinkText from "@/components/atoms/LinkText/LinkText";
import LoginForm from "@/components/organisms/LoginForm/LoginForm";
import { I_LoginRequest } from "@/types/schema/auth";
import { repositories } from "@/repositories/factories/RepositoryFactory";
import { useSetCookie } from "@/composables/useSetCookie";
import { useAuth } from "@/contexts/AuthContext";
import { useSetLocalStorage } from "@/composables/useSetLocalStorage";

const Login = () => {
  const { t } = useTranslation(["login", "form"]);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  console.log("🚀 ~ file: index.tsx:21 ~ isLoggedIn:", isLoggedIn);

  /*
   * set Token to cookie
   */
  const { setCookieToken, removeCookieToken } = useSetCookie();
  const { setLocalStorageToken } = useSetLocalStorage();

  /*
   * fetch user
   */
  const fetchUser = async (idToken: string) => {
    await repositories
      .user()
      .userAccount(idToken)
      .then(async (response: any) => {
        console.log("🚀 ~ file: index.tsx:30 ~ response:", response);
        setIsLoggedIn(true);
        setAuthUser({ ...response.data });
      });
  };

  /*
   * click login submit button
   */
  const handleClickSubmit = async (formValues: I_LoginRequest) => {
    setIsLoading(true);
    await repositories
      .auth()
      .login({ ...formValues })
      .then((response: any) => {
        console.log("🚀 ~ file: index.tsx:19 ~ response:", response);
        if (response?.data.data.message === "resend confirm email") {
        } else {
          // Login successful
          const idToken = response?.data?.data?.AuthenticationResult?.IdToken;
          const expiresIn = response?.data?.data?.AuthenticationResult?.ExpiresIn;
          const domain = process.env.NEXT_PUBLIC_LOGIN_COOKIE_DOMAIN || "";

          setCookieToken(idToken, domain, "/", expiresIn);
          setLocalStorageToken(idToken);
          fetchUser(idToken);
        }
      })
      .catch((error: any) => {
        console.log("🚀 ~ file: index.tsx:24 ~ error:", error);
        const errorMessage = error.response?.data?.message;

        if (errorMessage === "PasswordResetRequiredException") {
          // useLoginUserState.setEmail(formValues.email)
          // router.push(app.localePath('login-force-pass-reset'))
        } else if (errorMessage === "UserNotFoundException") {
          setServerError(t("form.errorMessage.userNotFoundException", { ns: "form" }) || "");
        } else if (errorMessage === "NotAuthorizedException") {
          setServerError(t("form.errorMessage.notAuthorizedException", { ns: "form" }) || "");
        } else if (errorMessage === "Bad Request Exception") {
          setServerError(t("form.errorMessage.badRequest", { ns: "form" }) || "");
        } else {
          setServerError(t("form.errorMessage.normal", { ns: "form" }) || "");
        }
      });
    setIsLoading(false);
  };

  return (
    <DefaultLayout bgColor="gray">
      <SectionContainer bgColor="gray" columns="1" position="left" wrapSize="large">
        <div className={styles.loginTemp}>
          <Card widthSize="small" isLoading={isLoading}>
            <Card.Title>
              <h1 className={styles.loginTemp_heading}>{t("login.heading")}</h1>
            </Card.Title>
            <Card.Subtitle>
              {t("login.subtext1")}
              <LinkText color="secondary" link="/register" value={t("login.subtext2")} />
            </Card.Subtitle>
            <Card.Body>
              <LoginForm isLoading={isLoading} serverError={serverError} emitOnClickSubmit={handleClickSubmit} />
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
    ...(await serverSideTranslations(locale ?? "en", ["common", "login", "form"])),
  },
});
