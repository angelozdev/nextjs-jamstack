import { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Heading, Pane, Link } from "evergreen-ui";

import { Wrapper, Image } from "@components";
import { Routes } from "@utils/constants";

function Hero({ image, plantName, slug }: Plant) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(`/entry/${slug}`).then(() => {
      console.log("prefetching");
    });
  }, [slug, router]);
  return (
    <Pane is="section">
      <Wrapper maxWidth="1280px" hasPadding={false}>
        <Pane position="relative" paddingY="2rem">
          {image.url && (
            <Pane opacity={0.55}>
              <Wrapper maxWidth="600px" hasPadding={false}>
                <Image
                  src={image.url}
                  alt={plantName}
                  width={600}
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
              passHref
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
