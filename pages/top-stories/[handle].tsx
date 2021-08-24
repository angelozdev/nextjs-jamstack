import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Authors } from "@views";
import { getAuthorList } from "@services/authors";
import ErrorPage from "@pages/_error";

// types
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface Props {
  data: { authors: Author[] };
  status: Statuses;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const currentAuthor = params?.handle;

  try {
    if (typeof currentAuthor !== "string")
      throw new Error(
        "[TOP_STORIES: getServerSideProps]: currentAuthor is invalid"
      );

    const authors: Author[] = await getAuthorList({ limit: 10 });
    const doesAuthorExist = authors.some(
      (author) => author.handle === currentAuthor
    );
    const areThereAuthors = !!authors.length;

    if (!areThereAuthors)
      throw new Error(
        "[TOP_STORIES: getServerSideProps]: There are no authors"
      );

    if (!doesAuthorExist) {
      return {
        redirect: {
          destination: `/top-stories/${authors[0].handle}`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        data: { authors, currentAuthor },
        status: "success",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: { authors: [], currentAuthor },
        status: "error",
      },
    };
  }
};

function TopStories({
  status,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { authors } = data;
  const router = useRouter();
  const currentAuthor = router.query?.handle;

  const { fullName = "Unknown" } =
    authors.find(({ handle }) => handle === currentAuthor) || {};

  if (status === "error" || typeof currentAuthor !== "string") {
    return (
      <ErrorPage
        statusCode={502}
        message="Uhps! There is an error to fetch data"
      />
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{fullName} - Top Stories</title>
      </Head>
      <Authors authors={authors} currentAuthor={currentAuthor} />
    </Fragment>
  );
}

export default TopStories;