import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getPlantById($id: String!) {
    plant(id: $id) {
      plantName
      slug
    }
  }
`;

async function getPlantById(id: string) {
  return client.query<{ plant: Plant }>({
    query,
    variables: { id },
  });
}

export default getPlantById;
