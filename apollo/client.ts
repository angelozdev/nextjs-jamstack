import { ApolloClient, InMemoryCache } from "@apollo/client";
import { EnvironmentVariables } from "@constants";

const { contentful } = EnvironmentVariables;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${contentful.SPACE_ID}`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${contentful.ACCESS_TOKEN}`,
  },
});

export default client;
