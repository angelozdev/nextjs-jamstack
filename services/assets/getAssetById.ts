import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAssetById($id: String!) {
    asset(id: $id) {
      title
      description
      url
    }
  }
`;

async function getAssetById(id: string) {
  return client.query<{ asset: Asset }>({
    query,
    variables: { id },
  });
}

export default getAssetById;
