import "@/styles/globals.css";

import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
