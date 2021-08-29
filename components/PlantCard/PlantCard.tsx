import { Button, Card, Heading, Pane } from "evergreen-ui";
import { getRichText } from "./utils";
import { RichText, Image } from "@components";
import { Routes } from "@constants";
import { useMemo } from "react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

interface Props {
  image: Asset;
  plantName: string;
  description: PlantDescription;
  slug: string;
}

function PlantCard({ image, plantName, description, slug }: Props) {
  const { t } = useTranslation("plant-card");
  const richText = useMemo(
    () => getRichText(description?.json),
    [description?.json]
  );

  return (
    <Card is="li" hoverElevation={1}>
      <NextLink
        href={{
          pathname: Routes.SINGLE_PLANT,
          query: { slug },
        }}
      >
        <a>
          {image?.url && (
            <Pane margin="0" padding="0" is="figure" textAlign="center">
              <Image
                aspectRatio="4:3"
                src={image?.url}
                alt={image.title}
                width={600}
                fit="fill"
                objectFit="cover"
              />
            </Pane>
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
          </Pane>
        </a>
      </NextLink>
    </Card>
  );
}

export default PlantCard;
