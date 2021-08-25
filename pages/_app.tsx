import "styles/globals.css";
import { Layout, PreviewModeBanner } from "@components";

// types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <PreviewModeBanner />
    </Layout>
  );
}
export default MyApp;
