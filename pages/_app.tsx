import "styles/globals.css";
import { Layout } from "@components";
import { appWithTranslation } from "next-i18next";
// types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default appWithTranslation(MyApp);
