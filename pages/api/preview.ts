import { NextApiRequest, NextApiResponse } from "next";
import { ssrGetRecipe } from "../../src/generated/content";
import { PreviewRequestParamSchema } from "../../src/schemas/preview";

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = PreviewRequestParamSchema.safeParse(req.query);

  if (!params.success) {
    return res
      .status(400)
      .json({ message: "Invalid query params", errors: params.error.issues });
  }

  if (params.data.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  // TODO: check CMS here to see if the recipe/article exists
  //       will need to figure out which type to fetch
  const content = await ssrGetRecipe.getServerPage(
    { variables: { id: params.data.id } },
    { req }
  );

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!content) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ recipe: content.props.data.recipe });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: `/${params.data.contentType}s/${content.props.data.recipe?.data?.id}`,
  });
  res.end();
}
