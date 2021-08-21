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

async function getPlantById(id: string) {
  return client.query<{ plant: Plant }>({
    query,
    variables: { id },
  });
}

export default getPlantById;
