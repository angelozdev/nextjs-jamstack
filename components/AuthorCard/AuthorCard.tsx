import { Link, Pane, Paragraph } from "evergreen-ui";
import { Image } from "@components";
import NextLink from "next/link";
import { Routes } from "@constants";

interface Props {
  fullName: string;
  photo: Asset;
  handle: string;
}

function AuthorCard({ fullName, photo, handle }: Props) {
  return (
    <Pane is="li">
      <NextLink
        href={{
          pathname: Routes.TOP_STORIES,
          query: { handle },
        }}
      >
        <Link cursor="pointer">
          {photo?.url && (
            <Image
              src={photo.url}
              alt={photo.title}
              width={photo.width}
              layout="responsive"
              aspectRatio="1:1"
              fit="fill"
            />
          )}

          <Pane paddingY=".5rem" textAlign="center">
            <Paragraph size={500}>{fullName}</Paragraph>
          </Pane>
        </Link>
      </NextLink>
    </Pane>
  );
}

export default AuthorCard;
