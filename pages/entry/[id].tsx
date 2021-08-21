import { getPlantById, getPlantList } from "@services/plants";
import { SinglePlant } from "@views";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

interface Props {
  plant: Plant;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const {
      data: { plantCollection },
    } = await getPlantList({ limit: 10 });

    const paths = plantCollection.items.map(({ sys }) => ({
      params: { id: sys?.id },
    }));

    return { paths, fallback: false };
  } catch (error) {
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id;

  try {
    if (typeof id !== "string") throw new Error("[entry/:id]: id is invalid");

    const {
      data: { plant },
    } = await getPlantById(id);

    return {
      props: {
        plant,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

function Entry({ plant }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SinglePlant plant={plant} />;
}

export default Entry;
