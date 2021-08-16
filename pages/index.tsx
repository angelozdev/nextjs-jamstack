import { getPlantList } from "@services/plants";
import { Home } from "@views";

// types
import type { GetStaticProps } from "next";

interface Props {
  plants: PlantCollection;
}

function Index({ plants }: Props) {
  const areTherePlants = !!plants.items.length;
  if (!areTherePlants) return <p>There is no plants for now :(</p>;
  return <Home plantCollection={plants} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const { data, error, errors } = await getPlantList();
    if (error || !!errors?.length) return Promise.reject(error || errors);

    return {
      props: {
        plants: data.plantCollection,
      },
    };
  } catch (error) {
    return {
      props: {
        plants: { items: [], limit: 10, skip: 0, total: 0 },
      },
    };
  }
};
export default Index;
