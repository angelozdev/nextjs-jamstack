import { Card, Heading, Link, Pane, Paragraph } from "evergreen-ui";
import NextLink from "next/link";
import { Image } from "@components";
import { Routes } from "@constants";
import { useRouter } from "next/router";

interface Props {
  recentPosts: Plant[];
}

function RecentPosts({ recentPosts }: Props) {
  const { query } = useRouter();
  const currentPost = query?.slug;
  return (
    <Pane>
      <Heading is="h3" size={600}>
        Recent Posts
      </Heading>
      {recentPosts.map(({ slug, plantName, image }) => {
        const isCurrentPost = slug === currentPost;
        return (
          <Card key={slug} borderBottom paddingY=".5rem">
            <NextLink
              href={{
                pathname: Routes.SINGLE_PLANT,
                query: { slug },
              }}
              passHref
            >
              <Link display="flex" gap=".5rem" alignItems="center">
                <Pane
                  flexBasis="80px"
                  is="figure"
                  padding="0"
                  margin="0"
                  display="flex"
                >
                  <Image
                    src={image.url}
                    alt={plantName}
                    aspectRatio="4:3"
                    width={80}
                    fit="fill"
                    objectFit="cover"
                  />
                </Pane>

                <Pane flexGrow={1} flexBasis="200px">
                  <Paragraph color={isCurrentPost ? "blue900" : "muted"}>
                    {plantName}
                  </Paragraph>
                </Pane>
              </Link>
            </NextLink>
          </Card>
        );
      })}
    </Pane>
  );
}

export default RecentPosts;
