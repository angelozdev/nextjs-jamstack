import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getPlantList($limit: Int = 10, $skip: Int = 0, $order: [PlantOrder]) {
    plantCollection(limit: $limit, skip: $skip, order: $order) {
      limit
      skip
      total
      items {
        slug
        description {
          json
        }
        plantName
        sys {
          id
        }
        image {
          url
          title
          width
          height
        }
      }
    }
  }
`;

async function getPlantList(options?: Options<PlantOrder>) {
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client.query<{ plantCollection: PlantCollection }>({
    query,
    variables: { limit, skip, order },
  });
}

export default getPlantList;
