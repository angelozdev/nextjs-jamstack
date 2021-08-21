const EnvironmentVariables = {
  contentful: {
    ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || "",
    SPACE_ID: process.env.CONTENTFUL_SPACE_ID || "",
  },
};

export default EnvironmentVariables;
