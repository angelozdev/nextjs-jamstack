import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getCategoryList(
    $limit: Int = 10
    $skip: Int = 0
    $order: [CategoryOrder]
  ) {
    categoryCollection(limit: $limit, skip: $skip, order: $order) {
      limit
      items {
        title
        slug
      }
    }
  }
`;

async function getCategoryList(options?: Options<CategoryOrder>) {
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client.query<{ categoryCollection: CategoryCollection }>({
    query,
    variables: { limit, skip, order },
  });
}

export default getCategoryList;
