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

async function getPlantList(options?: Options<PlantOrder>): Promise<Plant[]> {
  const { limit = 10, skip = 10, order = [] } = options || {};
  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { limit, skip, order },
    })
    .then(({ data }) => {
      if (!data?.plantCollection?.items?.length)
        throw new Error("[SERVICES]: plants not foun");
      return data.plantCollection.items;
    });
}

export default getPlantList;
