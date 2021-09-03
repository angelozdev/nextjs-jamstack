import { gql } from "@apollo/client";
import { client } from "@apollo";
import { Locales } from "@utils/constants";

const query = gql`
  query getPlantList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [PlantOrder]
    $locale: String
    $author: String!
  ) {
    plantCollection(
      limit: $limit
      skip: $skip
      order: $order
      locale: $locale
      where: { author: { handle: $author } }
    ) {
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
  author: string,
  options: Options<PlantOrder> = {}
): Promise<Plant[]> {
  const {
    limit = 10,
    skip = 0,
    order = [],
    locale = Locales.ENGLISH,
  } = options;

  if (!author) {
    throw new Error("[getPlantsByAuthor]: invalid author");
  }

  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { limit, skip, order, locale, author },
    })
    .then(({ data }) => {
      const plants = data?.plantCollection?.items;
      if (!plants) throw new Error("[SERVICES]: plants not found");
      return plants;
    });
}

export default getPlantsByAuthor;
