import { getAuthorList } from "@services/authors";
import { getPlantList } from "@services/plants";
import { Home } from "@views";

// types
import type { GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {
  plants: PlantCollection;
  authors: AuthorCollection;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const {
      data: { plantCollection },
    } = await getPlantList({ limit: 7 });

    const {
      data: { authorCollection },
    } = await getAuthorList({ limit: 4 });

    return {
      props: {
        plants: plantCollection,
        authors: authorCollection,
      },
    };
  } catch (error) {
    return {
      props: {
        plants: { items: [], limit: 0, skip: 0, total: 0 },
        authors: { items: [], limit: 0, skip: 0, total: 0 },
      },
    };
  }
};
export default Index;

function Index({
  plants,
  authors,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Home plantCollection={plants} authorCollection={authors} />;
}
