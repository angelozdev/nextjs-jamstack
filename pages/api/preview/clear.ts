import { NextApiRequest, NextApiResponse } from "next";

function clearPreview(req: NextApiRequest, res: NextApiResponse) {
  const callback = req.query?.callback;
  res.clearPreviewData();

  if (typeof callback !== "string") {
    return res.redirect("/");
  }

  res.redirect(callback);
}

export default clearPreview;
