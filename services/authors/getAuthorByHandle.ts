import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAuthorByHandle($handle: String!) {
    authorCollection(where: { handle: $handle }, limit: 1) {
      items {
        fullName
      }
    }
  }
`;

async function getAuthorByHandle(handle: string): Promise<Author> {
  return client
    .query<{ authorCollection: AuthorCollection }>({
      query,
      variables: { handle },
    })
    .then(({ data }) => {
      if (!data?.authorCollection?.items?.length)
        throw new Error(`[SERVICES]: authors not found`);
      return data.authorCollection.items[0];
    });
}

export default getAuthorByHandle;
