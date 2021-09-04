const EnvironmentVariables = {
  node: {
    env: process.env.NODE_ENV,
  },
  contentful: {
    ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
    SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
    SECRET: process.env.CONTENTFUL_SECRET || "",
    PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || "",
  },
  nextAuth: {
    URL: process.env.NEXTAUTH_URL,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
  },
};

function generateWarns(object: Object, parent?: string) {
  Object.entries(object).forEach(([key, value]) => {
    if (typeof value === "object") return generateWarns(value, key);
    if (!value && EnvironmentVariables.node.env === "development") {
      console.warn(
        `----> [CONSTANTS: envVariables]: "${parent}.${key}" is not defined`
      );
    }
  });
}

generateWarns(EnvironmentVariables);

export default EnvironmentVariables;
