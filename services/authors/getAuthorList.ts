import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAuthorList($limit: Int = 10, $skip: Int = 0, $order: [AuthorOrder]) {
    authorCollection(limit: $limit, skip: $skip, order: $order) {
      limit
      items {
        photo {
          title
          url
          width
          height
        }
        fullName
        sys {
          id
        }
      }
    }
  }
`;

async function getAuthorList(options?: Options<AuthorOrder>) {
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client.query<{ authorCollection: AuthorCollection }>({
    query,
    variables: { limit, skip, order },
  });
}

export default getAuthorList;
