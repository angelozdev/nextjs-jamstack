import { Fragment } from "react";
import { Footer, Header } from "@components";

// types
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
