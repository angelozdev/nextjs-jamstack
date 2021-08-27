import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getCategoryList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [CategoryOrder]
    $locale: String
  ) {
    categoryCollection(
      limit: $limit
      skip: $skip
      order: $order
      locale: $locale
    ) {
      items {
        title
        sys {
          id
        }
        icon {
          url
          width
          title
        }
      }
    }
  }
`;

async function getCategoryList(
  options?: Options<CategoryOrder>
): Promise<Category[]> {
  const { limit = 10, skip = 0, order = [], locale = "en-US" } = options || {};
  return client
    .query<{ categoryCollection: CategoryCollection }>({
      query,
      variables: { limit, skip, order, locale },
    })
    .then(({ data }) => {
      if (!data?.categoryCollection?.items?.length)
        throw new Error("[SERVICES]: categories not found");
      return data.categoryCollection.items;
    });
}

export default getCategoryList;
