import { Pane } from "evergreen-ui";
import { PlantCard } from "@components";

// types
interface Props {
  plantCollection: PlantCollection;
}

function Home({ plantCollection }: Props) {
  const plants = plantCollection.items;

  return (
    <Pane is="section" marginY="1rem">
      {/* Wrapper */}
      <Pane maxWidth="1024px" marginX="auto" paddingX="1rem">
        {/* Content */}
        <Pane
          is="ul"
          display="grid"
          listStyle="none"
          paddingLeft="0"
          gap="1rem"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          {plants.map(({ plantName, sys, image }) => (
            <PlantCard key={sys?.id} plantName={plantName} image={image} />
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Home;
