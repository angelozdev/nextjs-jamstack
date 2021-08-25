import { NextApiRequest, NextApiResponse } from "next";

function clearPreview(_: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.redirect("/");
  res.end();
}

export default clearPreview;
