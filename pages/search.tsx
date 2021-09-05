import { Fragment } from "react";
import { Search } from "@views";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

// types
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
interface Props {
  session: Session | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  locale,
}) => {
  try {
    if (typeof locale !== "string") {
      throw new Error("[SearchPage: getStaticProps]: invalid locale");
    }

    const session = await getSession({ req });
    const translations = await serverSideTranslations(locale, [
      "header",
      "footer",
      "search",
    ]);

    return {
      props: {
        ...translations,
        session,
      },
    };
  } catch (error) {
    return {
      props: {
        session: null,
      },
    };
  }
};

function SearchPage({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Fragment>
      <Head>
        <title>🔍️ Treepedia | Search </title>
      </Head>
      <Search user={session?.user} />
    </Fragment>
  );
}

export default SearchPage;
