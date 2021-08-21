import { Alert, Pane } from "evergreen-ui";
import { AuthorsSection, Hero, PlantList, Wrapper } from "@components";
import { Fragment } from "react";

// types
interface Props {
  plantCollection: PlantCollection;
  authorCollection: AuthorCollection;
}

function Home({ plantCollection, authorCollection }: Props) {
  const [firstPlant, ...plants] = plantCollection.items || [];
  const areTherePlants = !!plants.length;
  const authors = authorCollection.items || [];

  return (
    <Fragment>
      <Hero {...firstPlant} />
      <AuthorsSection authors={authors} />
      <Pane is="section" marginY="1rem">
        <Wrapper maxWidth={areTherePlants ? "1280px" : "768px"}>
          {!areTherePlants && (
            <Alert intent="warning">There are no plants for now! :o</Alert>
          )}

          {areTherePlants && <PlantList plants={plants} />}
        </Wrapper>
      </Pane>
    </Fragment>
  );
}

export default Home;
