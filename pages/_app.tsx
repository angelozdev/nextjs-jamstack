import "styles/globals.css";
import { Layout } from "@components";
import { Provider as InternationalizationProvider } from "contexts/internationalization";

// types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InternationalizationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </InternationalizationProvider>
  );
}
export default MyApp;
