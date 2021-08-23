import { Wrapper } from "@components";
import { getAuthorList } from "@services/authors";
import { Authors } from "@views";
import { Alert, Pane } from "evergreen-ui";
import { useRouter } from "next/router";

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

  if (status === "error" || typeof currentAuthor !== "string") {
    return (
      <Pane paddingY="2rem" minHeight="80vh">
        <Wrapper maxWidth="600px">
          <Alert title="Error to fetch data" intent="danger">
            Uhps! There is an error to fetch data :/
          </Alert>
        </Wrapper>
      </Pane>
    );
  }

  if (!authors.length) {
    return (
      <Pane paddingY="2rem" minHeight="80vh">
        <Wrapper maxWidth="600px">
          <Alert title="Authors not found" intent="warning">
            There are no authors for now :(
          </Alert>
        </Wrapper>
      </Pane>
    );
  }

  return <Authors authors={authors} currentAuthor={currentAuthor} />;
}

export default TopStories;
