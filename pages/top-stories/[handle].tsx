import { isApolloError } from "@apollo/client";
import { Wrapper } from "@components";
import { getAuthorList } from "@services/authors";
import { Authors } from "@views";
import { Alert, Pane } from "evergreen-ui";

// types
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface Props {
  data: { authors: Author[]; currentAuthor: string };
  status: Statuses;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const handle = params?.handle;
  if (typeof handle !== "string")
    throw new Error("[TOP_STORIES: getServerSideProps]: handle is invalid");

  try {
    const authors: Author[] = await getAuthorList({ limit: 10 });
    const doesAuthorExist = authors.some((author) => author.handle === handle);
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
        data: { authors, currentAuthor: handle },
        status: "success",
        error: null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: { authors: [], currentAuthor: handle },
        status: "error",
      },
    };
  }
};

function TopStories({
  status,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { authors, currentAuthor } = data;

  if (!authors.length) {
    return (
      <Pane paddingY="2rem" minHeight="80vh">
        <Wrapper maxWidth="600px">
          <Alert title="Authors not found" intent="danger">
            There are no authors for now :(
          </Alert>
        </Wrapper>
      </Pane>
    );
  }

  return <Authors authors={authors} currentAuthor={currentAuthor} />;
}

export default TopStories;
