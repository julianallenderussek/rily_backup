import { GetServerSideProps, GetStaticPaths } from "next";
import { ssrGetRecipe } from "../../src/generated/content";
import { GetRecipeQuery } from "../../src/generated/content-graphql";
import { normalizeStrapi } from "../../src/utils/strapi-normalize";

interface RecipeDetailPageProps {
  recipe: GetRecipeQuery["recipe"];
}

const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ recipe }) => {
  const normalizedRecipe = normalizeStrapi(recipe).recipe;
  return <div>test: {normalizedRecipe.id}</div>;
};

export const getStaticProps: GetServerSideProps<
  RecipeDetailPageProps | {}
> = async ({ params, preview, previewData, req }) => {
  if (!params?.id || typeof params?.id !== "string") {
    return {
      notFound: true,
    };
  }

  if (preview && previewData) {
    return {
      props: {
        recipe: previewData,
      },
    };
  }

  const recipe = (
    await ssrGetRecipe.getServerPage({ variables: { id: params?.id } }, { req })
  ).props;

  if (!recipe?.data?.recipe?.data?.attributes?.publishedAt) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default RecipeDetailPage;
