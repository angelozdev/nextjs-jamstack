import { Alert, Pane } from "evergreen-ui";
import { PlantList } from "@components";

// types
interface Props {
  plantCollection: PlantCollection;
}

function Home({ plantCollection }: Props) {
  const plants = plantCollection.items || [];
  const areTherePlants = !!plants.length;

  return (
    <Pane is="section" marginY="1rem">
      <Pane
        maxWidth={areTherePlants ? "1280px" : "768px"}
        marginX="auto"
        paddingX="1rem"
      >
        {!areTherePlants && (
          <Alert intent="warning">There are no plants for now! :o</Alert>
        )}

        {areTherePlants && <PlantList plants={plants} />}
      </Pane>
    </Pane>
  );
}

export default Home;
