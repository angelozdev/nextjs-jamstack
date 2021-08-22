import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getPlantBySlug($slug: String!) {
    plantCollection(where: { slug: $slug }, limit: 1) {
      items {
        plantName
        slug
        description {
          json
        }
        image {
          url
          title
          width
        }
        author {
          fullName
          photo {
            url
            width
          }
          biography
        }
        category {
          title
          icon {
            url
          }
        }
      }
    }
  }
`;

async function getPlantById(slug: string): Promise<Plant> {
  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { slug },
    })
    .then(({ data }) => {
      if (!data?.plantCollection?.items?.length)
        throw new Error(`[SERVICES]: plant not found`);
      return data.plantCollection.items[0];
    });
}

export default getPlantById;
