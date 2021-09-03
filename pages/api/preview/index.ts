import { NextApiRequest, NextApiResponse } from "next";
import { ApolloError, isApolloError } from "@apollo/client";

import { EnvironmentVariables } from "@utils/constants";
import { getPlantBySlug } from "@api/services/plants";

const { contentful, node } = EnvironmentVariables;

async function enablePreview(req: NextApiRequest, res: NextApiResponse) {
  const { slug, secret } = req.query;
  const isValidSecret = secret === contentful.SECRET;

  if (!isValidSecret || typeof slug !== "string" || !slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const plant = await getPlantBySlug(slug, true);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.setPreviewData({});

    // res.json({ message: `/entry/${plant.slug}` });
    res.redirect(`/entry/${plant.slug}`);
  } catch (error) {
    if (node.env === "development") console.error(error);
    const messageError = isApolloError(error as Error)
      ? (error as ApolloError).message
      : (error as Error)?.message;
    res.status(500).json({ message: messageError });
  }
}

export default enablePreview;
