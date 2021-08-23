import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAuthorList($limit: Int = 10, $skip: Int = 0, $order: [AuthorOrder]) {
    authorCollection(limit: $limit, skip: $skip, order: $order) {
      limit
      items {
        biography
        handle
        photo {
          title
          url
          width
        }
        fullName
      }
    }
  }
`;

async function getAuthorList(
  options?: Options<AuthorOrder>
): Promise<Author[]> {
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client
    .query<{ authorCollection: AuthorCollection }>({
      query,
      variables: { limit, skip, order },
    })
    .then(({ data }) => {
      if (!data?.authorCollection?.items?.length)
        throw new Error("[SERVICES]: authors not found");
      return data.authorCollection.items;
    });
}

export default getAuthorList;
