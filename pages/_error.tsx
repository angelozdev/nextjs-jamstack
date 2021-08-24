import { Wrapper } from "@components";
import { ArrowLeftIcon, Button, Heading, Pane, Paragraph } from "evergreen-ui";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
  statusCode: number;
  message?: string;
}

const getErrorMessage = (statusCode: number) => {
  if (statusCode < 500 && statusCode >= 400) {
    return "An error occurred on the client";
  }
  return "An error occurred on the server";
};

const Error: NextPage<Props> = ({ statusCode, message = "" }) => {
  const router = useRouter();
  const errorMessage = message || getErrorMessage(statusCode);

  return (
    <Pane paddingY="3rem" minHeight="80vh">
      <Wrapper maxWidth="768px">
        <Pane
          paddingTop="5rem"
          paddingBottom="3rem"
          paddingX="2rem"
          textAlign="center"
          height="100%"
        >
          <Heading fontSize="4rem" is="h1" size={900}>
            {statusCode}
          </Heading>

          <Pane marginTop=".5rem">
            <Paragraph size={500} fontSize="1.5rem">
              {errorMessage}
            </Paragraph>
          </Pane>

          <Pane marginTop="2rem">
            <Button
              size="large"
              textTransform="uppercase"
              appearance="primary"
              onClick={() => router.back()}
              iconBefore={ArrowLeftIcon}
            >
              Come back
            </Button>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  const message = err?.message;

  return { statusCode, message };
};

export default Error;
