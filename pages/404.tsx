import { Wrapper } from "@components";
import { ArrowLeftIcon, Button, Heading, Pane, Paragraph } from "evergreen-ui";
import { useRouter } from "next/router";

function NotFoundPage() {
  const router = useRouter();
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
            404
          </Heading>

          <Pane marginTop=".5rem">
            <Paragraph size={500} fontSize="1.5rem">
              Sorry, this page isn&apos;t available
            </Paragraph>
          </Pane>

          <Pane marginTop="2rem">
            <Button
              size="large"
              textTransform="uppercase"
              appearance="primary"
              onClick={() => {
                router.replace("/");
              }}
              iconBefore={ArrowLeftIcon}
            >
              Back to home
            </Button>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default NotFoundPage;
