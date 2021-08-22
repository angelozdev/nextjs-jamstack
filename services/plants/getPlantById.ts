import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getPlantById($id: String!) {
    plant(id: $id) {
      plantName
      slug
      description {
        json
      }
      image {
        url
        width
        height
      }
      author {
        fullName
        biography
        photo {
          url
          title
          width
        }
      }
      category {
        title
        icon {
          url
        }
      }
    }
  }
`;

async function getPlantById(id: string): Promise<Plant> {
  return client
    .query<{ plant: Plant }>({
      query,
      variables: { id },
    })
    .then(({ data }) => {
      if (!data?.plant) throw new Error(`[SERVICES]: plant not found`);
      return data.plant;
    });
}

export default getPlantById;
