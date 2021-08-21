import { getPlantById, getPlantList } from "@services/plants";
import { SinglePlant } from "@views";
import { useRouter } from "next/router";

// types
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Pane, Spinner } from "evergreen-ui";

interface Props {
  plant: Plant;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const plants = await getPlantList({ limit: 10 });
  const paths = plants.map(({ sys }) => ({
    params: { id: sys.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id;

  try {
    if (typeof id !== "string")
      throw new Error(`[ENTRY/${id?.toString()}]: id is invalid`);
    const plant = await getPlantById(id);
    return {
      props: { plant },
      revalidate: 5 * 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};

function Entry({ plant }: InferGetStaticPropsType<typeof getStaticProps>) {
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
  return <SinglePlant plant={plant} />;
}

export default Entry;
