import { Context, gql } from "@apollo/client";
import { client } from "@apollo";
import { EnvironmentVariables } from "@constants";

const { contentful } = EnvironmentVariables;

const query = gql`
  query getPlantBySlug($slug: String!, $preview: Boolean) {
    plantCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        plantName
        slug
        description {
          json
        }
        image {
          url
          title
          width
        }
        author {
          fullName
          photo {
            url
            width
          }
          biography
        }
        category {
          title
          icon {
            url
          }
        }
      }
    }
  }
`;

async function getPlantById(
  slug: string,
  isPreview: boolean = false
): Promise<Plant> {
  const context: Context = {};

  if (isPreview) {
    context.headers = {};
    context.headers.Authorization = `Bearer ${contentful.PREVIEW_ACCESS_TOKEN}`;
  }

  return client
    .query<{ plantCollection: PlantCollection }>({
      query,
      variables: { slug, preview: isPreview },
      context,
      fetchPolicy: isPreview ? "cache-first" : "no-cache",
    })
    .then(({ data }) => {
      if (!data?.plantCollection?.items?.length)
        throw new Error(`[SERVICES]: plant ${slug} not found`);
      return data.plantCollection.items[0];
    });
}

export default getPlantById;
