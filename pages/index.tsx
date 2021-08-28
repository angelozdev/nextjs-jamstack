import { Fragment } from "react";
import { EnvironmentVariables, Locales } from "@constants";
import { getAuthorList } from "@services/authors";
import { getPlantList } from "@services/plants";
import { Home } from "@views";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// types
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from "next";

interface Props {
  plants: Plant[];
  authors: Author[];
}

type TGetServerSidePropsResult = GetStaticPropsResult<Props>;
interface IGetStaticPropsContext extends GetStaticPropsContext {
  locale?: Locales;
}

export const getStaticProps = async ({
  locale,
}: IGetStaticPropsContext): Promise<TGetServerSidePropsResult> => {
  try {
    if (!locale || typeof locale !== "string") {
      throw new Error("[IndexPage: getStaticProps]: invalid locale");
    }

    const plants = await getPlantList({
      limit: 9,
      locale,
      order: "sys_publishedAt_DESC",
    });
    const authors = await getAuthorList({ limit: 4 });

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "header",
          "plant-card",
          "footer",
          "author-section",
        ])),
        plants,
        authors,
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    if (EnvironmentVariables.node.env === "development") {
      console.log(error);
    }
    return {
      notFound: true,
    };
  }
};
export default Index;

function Index({
  plants,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Fragment>
      <Head>
        <title>🏠 Treepedia | Nextjs course</title>
      </Head>
      <Home plants={plants} authors={authors} />
    </Fragment>
  );
}
