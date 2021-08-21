import {
  Button,
  Card,
  Heading,
  ListItem,
  OrderedList,
  Pane,
  Paragraph,
} from "evergreen-ui";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import NextLink from "next/link";
import { Routes } from "@constants";

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: function ContenfulParagraph(_, children) {
      return <Paragraph color="inherit">{children}</Paragraph>;
    },

    [BLOCKS.UL_LIST]: function ContenfulUlList(_, children) {
      return <OrderedList color="inherit">{children}</OrderedList>;
    },

    [BLOCKS.LIST_ITEM]: function ContenfulListItem(_, children) {
      return <ListItem color="inherit">{children}</ListItem>;
    },
  },
};

function PlantCard({ image, plantName, description, slug }: Partial<Plant>) {
  return (
    <Card is="li" hoverElevation={1}>
      {image?.url && (
        <Image
          src={image?.url}
          alt={image.title}
          width={100}
          height={70}
          layout="responsive"
          objectFit="cover"
        />
      )}

      <Pane padding="1rem">
        <Heading is="h3">{plantName}</Heading>

        <Pane
          color="gray"
          marginY="1rem"
          maxHeight={1.5 * 3 + "rem"}
          overflow="hidden"
          style={{
            WebkitLineClamp: 3,
            lineClamp: 3,
            boxOrient: "vertical",
            WebkitBoxOrient: "vertical",
            MozBoxOrient: "vertical",
            display: "-webkit-box",
          }}
        >
          {description?.json &&
            documentToReactComponents(
              {
                ...description?.json,
                content: [...description?.json.content.slice(0, 1)],
              },
              options
            )}{" "}
          (...)
        </Pane>
        <NextLink
          href={{
            pathname: Routes.SINGLE_PLANT,
            query: { slug },
          }}
        >
          <Button is="a" appearance="minimal">
            READ MORE
          </Button>
        </NextLink>
      </Pane>
    </Card>
  );
}

export default PlantCard;
