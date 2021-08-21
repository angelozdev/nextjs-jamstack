import Document, { Head, Main, NextScript, Html } from "next/document";
import { extractStyles } from "evergreen-ui";

// types
import type { DocumentContext } from "next/document";
interface Props {
  css: string;
  hydrationScript: JSX.Element;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, hydrationScript } = extractStyles();

    return {
      css,
      hydrationScript,
      ...initialProps,
    };
  }

  render() {
    const { css, hydrationScript } = this.props;
    return (
      <Html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
