import { getAuthorList } from "@services/authors";
import { getPlantList } from "@services/plants";
import { Home } from "@views";

// types
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Fragment } from "react";

interface Props {
  plants: Plant[];
  authors: Author[];
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  try {
    const plants = await getPlantList({
      limit: 9,
      locale: locale as Locales,
      order: "sys_publishedAt_DESC",
    });
    const authors = await getAuthorList({ limit: 4 });

    return {
      props: {
        plants,
        authors,
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
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
