import "styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { Provider as NextAuthProvider } from "next-auth/client";

import { Layout } from "@components";
import { Provider as SearchProvider } from "@contexts/search";

// types
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <SearchProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchProvider>
    </NextAuthProvider>
  );
}
export default appWithTranslation(MyApp);
