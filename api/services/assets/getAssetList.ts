import { gql } from "@apollo/client";
import { client } from "@apollo";

const query = gql`
  query getAssetList($limit: Int = 10, $skip: Int = 0, $order: [AssetOrder]) {
    assetCollection(limit: $limit, skip: $skip, order: $order) {
      limit
      items {
        fileName
        size
      }
    }
  }
`;

async function getAssetList(options?: Options<AssetOrder>) {
  const { limit = 10, skip = 0, order = [] } = options || {};
  return client.query<{ assetCollection: AssetCollection }>({
    query,
    variables: { limit, skip, order },
  });
}

export default getAssetList;
