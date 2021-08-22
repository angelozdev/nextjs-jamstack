import NextLink from "next/link";
import { Heading, Pane, Link } from "evergreen-ui";

import { Wrapper, Image } from "@components";
import { Routes } from "@constants";

function Hero({ image, plantName, slug }: Plant) {
  return (
    <Pane is="section">
      <Wrapper maxWidth="1280px" hasPadding={false}>
        <Pane position="relative" paddingY="2rem">
          {image.url && (
            <Pane opacity={0.55}>
              <Wrapper maxWidth="600px" hasPadding={false}>
                <Image
                  src={image.url}
                  layout="responsive"
                  alt={plantName}
                  width={image.width}
                  aspectRatio="3:4"
                  fit="fill"
                />
              </Wrapper>
            </Pane>
          )}
          <Pane
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            maxWidth="768px"
          >
            <NextLink
              href={{
                pathname: Routes.SINGLE_PLANT,
                query: { slug },
              }}
            >
              <Link is="a" cursor="pointer">
                <Heading
                  is="h1"
                  fontSize="clamp(2rem, 5vw, 4rem)"
                  lineHeight="1.3"
                  marginLeft="3vw"
                >
                  {plantName}
                </Heading>
              </Link>
            </NextLink>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Hero;
