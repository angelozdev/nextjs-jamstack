import "styles/globals.css";
import { appWithTranslation } from "next-i18next";

import { Layout } from "@components";
import { Provider } from "@contexts/search";

// types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default appWithTranslation(MyApp);
