import { NextApiRequest, NextApiResponse } from "next";

function previewStatus(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    preview: !!req.preview,
    context: req.previewData,
  });
}

export default previewStatus;
