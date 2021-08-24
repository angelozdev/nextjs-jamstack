import { getAuthorList } from "@services/authors";
import NextError from "next/error";

// types
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  try {
    const authors: Author[] = await getAuthorList({ limit: 1 });
    const areThereAuthors = !!authors.length;
    if (!areThereAuthors)
      throw new Error(
        "[TOP_STORIES: getServerSideProps]: There are no authors"
      );

    const [firstAuthor] = authors;

    return {
      redirect: {
        destination: `/top-stories/${firstAuthor.handle}`,
        permanent: false,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

function TopStories({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return <NextError statusCode={404} />;
}

export default TopStories;
