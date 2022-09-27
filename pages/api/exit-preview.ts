import { NextApiRequest, NextApiResponse } from "next";

export default async function exitPreview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.clearPreviewData();
}
