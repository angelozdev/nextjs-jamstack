import { Button, Card, Heading, Pane } from "evergreen-ui";
import { getRichText } from "./utils";
import { RichText, Image } from "@components";
import { Routes } from "@constants";
import { useMemo } from "react";
import NextLink from "next/link";

function PlantCard({ image, plantName, description, sys }: Partial<Plant>) {
  const richText = useMemo(
    () => getRichText(description?.json),
    [description?.json]
  );

  return (
    <Card is="li" hoverElevation={1}>
      {image?.url && (
        <Image
          aspectRatio="4:3"
          src={image?.url}
          alt={image.title}
          width={image.width}
          layout="responsive"
          fit="fill"
        />
      )}

      <Pane padding="1rem">
        <Heading is="h3">{plantName}</Heading>
        {richText && (
          <RichText
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
            document={richText}
          />
        )}
        <NextLink
          href={{
            pathname: Routes.SINGLE_PLANT,
            query: { id: sys?.id },
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
