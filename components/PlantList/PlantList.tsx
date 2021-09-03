import { Pane } from "evergreen-ui";
import { PlantCard } from "@components";
import { memo } from "react";

// types
interface Props {
  plants: Plant[];
}

function PlantList({ plants = [] }: Props) {
  return (
    <Pane
      is="ul"
      display="grid"
      listStyle="none"
      paddingLeft="0"
      gap="1rem"
      justifyItems="center"
      justifyContent="space-between"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      {plants.map(({ plantName, sys, image, description, slug }) => (
        <PlantCard
          key={sys?.id}
          plantName={plantName}
          image={image}
          description={description}
          slug={slug}
        />
      ))}
    </Pane>
  );
}

export default memo(PlantList);
