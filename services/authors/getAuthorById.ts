import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAuhtorById($id: String!) {
    author(id: $id) {
      fullName
    }
  }
`;

async function getAuhtorById(id: string) {
  return client.query<{ author: Author }>({
    query,
    variables: { id },
  });
}

export default getAuhtorById;
