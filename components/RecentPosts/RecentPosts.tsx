import { Card, Heading, Link, Pane, Paragraph } from "evergreen-ui";
import NextLink from "next/link";
import { Image } from "@components";
import { Routes } from "@constants";

interface Props {
  recentPosts: Plant[];
}

function RecentPosts({ recentPosts }: Props) {
  return (
    <Pane>
      <Heading is="h3" size={600}>
        Recent Posts
      </Heading>
      {recentPosts.map(({ slug, plantName, image }) => (
        <Card key={slug} borderBottom paddingY=".5rem">
          <NextLink
            href={{
              pathname: Routes.SINGLE_PLANT,
              query: { slug },
            }}
          >
            <Link
              cursor="pointer"
              display="flex"
              gap=".5rem"
              alignItems="center"
            >
              <Pane flexBasis="80px" is="figure" padding="0" margin="0">
                <Image
                  src={image.url}
                  alt={plantName}
                  aspectRatio="4:3"
                  width={image.width}
                  fit="fill"
                />
              </Pane>

              <Pane flexGrow={1} flexBasis="200px">
                <Paragraph>{plantName}</Paragraph>
              </Pane>
            </Link>
          </NextLink>
        </Card>
      ))}
    </Pane>
  );
}

export default RecentPosts;
