import { Pane } from "evergreen-ui";
import { PlantCard } from "@components";

// types
interface Props {
  plants: Partial<Plant>[];
}

function PlantList({ plants = [] }: Props) {
  return (
    <Pane
      is="ul"
      display="grid"
      listStyle="none"
      paddingLeft="0"
      gap="1rem"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      {plants.map(({ plantName, sys, image, description }) => (
        <PlantCard
          key={sys?.id}
          plantName={plantName}
          image={image}
          description={description}
        />
      ))}
    </Pane>
  );
}

export default PlantList;
