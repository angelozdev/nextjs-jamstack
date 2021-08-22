import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getCategoryList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [CategoryOrder]
  ) {
    categoryCollection(limit: $limit, skip: $skip, order: $order) {
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
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client
    .query<{ categoryCollection: CategoryCollection }>({
      query,
      variables: { limit, skip, order },
    })
    .then(({ data }) => {
      if (!data?.categoryCollection?.items?.length)
        throw new Error("[SERVICES]: categories not found");
      return data.categoryCollection.items;
    });
}

export default getCategoryList;
