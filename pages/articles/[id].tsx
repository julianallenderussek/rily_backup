import React from "react";
import styled from "styled-components";
import { ArticlePage, theme } from "@rily/components";
import client from "../../lib/client";
import { GetServerSideProps } from "next";
import { GetArticleByIdQueryResult } from "../../src/generated/content-graphql";
import { ssrGetArticleById } from "../../src/generated/content";
import { normalizeStrapi } from "../../src/utils/strapi-normalize";

interface ArticleDetailPageProps {
  article: GetArticleByIdQueryResult;
}

const Container = styled.div`
  background-color: ${theme.colors.white};
  overflow-x: hidden;
`;

const Article = ({ article }: { article: GetArticleByIdQueryResult }) => {
  const formattedArticle = normalizeStrapi(article);

  return (
    <Container>
      {/* <SEO
          article={article}
          title={article.title}
          description={article.subtitle}
          //pagePath={router.path}
          image={article.header.url}
        /> */}
      <ArticlePage data={formattedArticle} />
    </Container>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetServerSideProps<
  ArticleDetailPageProps | {}
> = async ({ params, preview, previewData, req }) => {
  if (!params?.id || typeof params?.id !== "string") {
    return {
      notFound: true,
    };
  }

  if (preview && previewData) {
    return {
      props: {
        article: previewData,
      },
    };
  }

  const splitParam = params?.id.split("-");
  const id = splitParam[splitParam.length - 1];
  const article = (
    await ssrGetArticleById.getServerPage({ variables: { id } }, { req })
  ).props;

  if (!article?.data?.article?.data?.attributes?.publishedAt) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
    revalidate: 10,
  };
};

export default Article;
