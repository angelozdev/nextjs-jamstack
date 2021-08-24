import { Fragment } from "react";
import { getPlantBySlug, getPlantList } from "@services/plants";
import { SinglePlant } from "@views";
import { useRouter } from "next/router";
import Head from "next/head";

// types
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Pane, Spinner } from "evergreen-ui";
import { getCategoryList } from "@services/categories";

interface Props {
  plant: Plant;
  categories: Category[];
  recentPosts: Plant[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const plants = await getPlantList({ limit: 10 });
  const paths = plants.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug;

  try {
    if (typeof slug !== "string")
      throw new Error(`[ENTRY/:slug]: slug is invalid`);
    const plant = await getPlantBySlug(slug);
    const categories = await getCategoryList();
    const recentPosts = await getPlantList({
      limit: 6,
      order: "sys_publishedAt_ASC",
    });

    return {
      props: { plant, categories, recentPosts },
      revalidate: 5 * 60,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

function Entry({
  plant,
  categories,
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isFallback } = useRouter();

  if (isFallback)
    return (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        gap="1rem"
        flexDirection="column"
      >
        <Spinner /> Loading...
      </Pane>
    );

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
