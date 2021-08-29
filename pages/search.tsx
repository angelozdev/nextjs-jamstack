import { Search } from "@views";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Fragment } from "react";
import Head from "next/head";

// types
interface Props {}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  try {
    if (typeof locale !== "string") {
      throw new Error("[SearchPage: getStaticProps]: invalid locale");
    }

    const translations = await serverSideTranslations(locale, [
      "header",
      "footer",
      "search",
    ]);

    return {
      props: {
        ...translations,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

function SearchPage() {
  return (
    <Fragment>
      <Head>
        <title>🔍️ Treepedia | Search </title>
      </Head>
      <Search />
    </Fragment>
  );
}

export default SearchPage;
