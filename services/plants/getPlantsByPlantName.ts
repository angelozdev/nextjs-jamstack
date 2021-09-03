import { gql } from "@apollo/client";
import { client } from "@apollo";
import { Locales } from "@utils/constants";

const query = gql`
  query getPlantList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [PlantOrder]
    $locale: String
    $term: String!
  ) {
    plantCollection(
      limit: $limit
      skip: $skip
      order: $order
      locale: $locale
      where: { plantName_contains: $term }
    ) {
      skip
      limit
      total
      items {
        sys {
          id
        }
        plantName
        description {
          json
        }
        slug
        image {
          url
          title
        }
      }
    }
  }
`;

async function getPlantsByAuthor(
  term: string = "",
  options: Options<PlantOrder> = {}
): Promise<PlantCollection> {
  const { limit = 9, skip = 0, order = [], locale = Locales.ENGLISH } = options;

  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { limit, skip, order, locale, term },
    })
    .then(({ data }) => {
      const plants = data?.plantCollection?.items;
      if (!plants) throw new Error("[SERVICES]: plants not found");
      return data?.plantCollection;
    });
}

export default getPlantsByAuthor;
