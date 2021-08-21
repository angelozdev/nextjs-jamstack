import { Pane } from "evergreen-ui";
import { AuthorsSection, Hero, PlantList, Wrapper } from "@components";
import { Fragment } from "react";

// types
interface Props {
  plants: Plant[];
  authors: Author[];
}

function Home({ plants, authors }: Props) {
  const [firstPlant, ...restPlants] = plants;

  return (
    <Fragment>
      <Hero {...firstPlant} />
      <AuthorsSection authors={authors} />
      <Pane is="section" marginY="1rem">
        <Wrapper maxWidth="1280px">
          <PlantList plants={restPlants} />
        </Wrapper>
      </Pane>
    </Fragment>
  );
}

export default Home;
