import { getAuthorList } from "@services/authors";
import { getPlantList } from "@services/plants";
import { Home } from "@views";

// types
import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {
  plants: Plant[];
  authors: Author[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const plants = await getPlantList({ limit: 7 });
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
  return <Home plants={plants} authors={authors} />;
}
