import Image from "next/image";
import NextLink from "next/link";
import { Heading, Pane, Link } from "evergreen-ui";

import { Wrapper } from "@components";
import { Routes } from "@constants";

function Hero({ image, plantName, slug }: Plant) {
  return (
    <Pane is="section">
      <Wrapper maxWidth="1280px" hasPadding={false}>
        <Pane position="relative">
          {image.url && (
            <Pane opacity={0.55} minHeight="70vh">
              <Wrapper maxWidth="768px" hasPadding={false}>
                <Image
                  src={image.url}
                  layout="fill"
                  width={image.width}
                  height={image.height}
                  alt={plantName}
                  objectFit="cover"
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
                  fontSize="3.5rem"
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
