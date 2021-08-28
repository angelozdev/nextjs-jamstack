import { gql } from "@apollo/client";
import { client } from "@apollo";
import { Locales } from "@constants";

const query = gql`
  query getPlantList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [PlantOrder]
    $locale: String
  ) {
    plantCollection(
      limit: $limit
      skip: $skip
      order: $order
      locale: $locale
    ) {
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

async function getPlantList(
  options: Options<PlantOrder> = {}
): Promise<Plant[]> {
  const {
    limit = 10,
    skip = 0,
    order = [],
    locale = Locales.ENGLISH,
  } = options;
  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { limit, skip, order, locale },
    })
    .then(({ data }) => {
      if (!data?.plantCollection?.items?.length)
        throw new Error("[SERVICES]: plants not foun");
      return data.plantCollection.items;
    });
}

export default getPlantList;
