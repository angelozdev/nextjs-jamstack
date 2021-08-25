import { Fragment } from "react";
import { Footer, Header, PreviewModeBanner } from "@components";

// types
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <PreviewModeBanner />
      <Footer />
    </Fragment>
  );
}

export default Layout;
