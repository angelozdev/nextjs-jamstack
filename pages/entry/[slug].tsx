import { Fragment } from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { SinglePlant } from "@views";
import { getCategoryList } from "@api/services/categories";
import { getPlantBySlug, getPlantList } from "@api/services/plants";
import { EnvironmentVariables, Locales } from "@utils/constants";

// types
import type {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Loader } from "@components";

interface Props {
  plant: Plant;
  categories: Category[];
  recentPosts: Plant[];
}

interface Path {
  params: {
    locale: Locales;
    slug: string;
  };
}

interface IGetStaticPathsContext extends GetStaticPathsContext {
  locales?: Locales[];
}

export const getStaticPaths = async ({
  locales,
}: IGetStaticPathsContext): Promise<GetStaticPathsResult> => {
  if (!locales || !Array.isArray(locales)) {
    throw new Error("You have to configure the locales in the next.config.js");
  }

  const plants = await getPlantList({ limit: 10 });
  const paths: Path[] = plants.flatMap(({ slug }) => {
    return locales.map((locale) => ({ params: { slug, locale } }));
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  preview,
  locale,
}) => {
  const slug = params?.slug;

  try {
    if (!locale) throw new Error("[EntryPage]: locale is invlaid");

    if (typeof slug !== "string") {
      throw new Error(`[ENTRY/:slug]: slug is invalid`);
    }

    const plant = await getPlantBySlug(slug, preview, locale as Locales);
    const categories = await getCategoryList({
      limit: 10,
      locale: locale as Locales,
    });
    const recentPosts = await getPlantList({
      limit: 6,
      order: "sys_publishedAt_DESC",
      locale: locale as Locales,
    });

    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "header",
          "recent-posts",
          "category-section",
          "footer",
        ])),
        plant,
        categories,
        recentPosts,
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    if (EnvironmentVariables.node.env === "development") {
      console.error(error);
    }
    return { notFound: true };
  }
};

function Entry({
  plant,
  categories,
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback) return <Loader />;

  return (
    <Fragment>
      <Head>
        <title>🌿 {plant.plantName} | Treepedia</title>
      </Head>
      <SinglePlant
        plant={plant}
        categories={categories}
        recentPosts={recentPosts}
      />
    </Fragment>
  );
}

export default Entry;
