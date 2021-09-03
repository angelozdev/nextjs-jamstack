import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getCategoryById($id: String!) {
    category(id: $id) {
      title
      slug
    }
  }
`;

async function getCategoryById(id: string) {
  return client.query<{ category: Category }>({
    query,
    variables: { id },
  });
}

export default getCategoryById;
