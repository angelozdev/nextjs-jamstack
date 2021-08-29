import { Card, Heading, Pane, Paragraph } from "evergreen-ui";
import { Image } from "@components";

// type
import type { AriaRole, ElementType } from "react";

interface Props {
  handle: Author["handle"];
  photo: Asset;
  fullName: Author["fullName"];
  biography: Author["biography"];
  currentAuthor?: Author["handle"];
  role?: AriaRole;
  is?: ElementType;
}

function AuthorDetails({
  biography,
  fullName,
  handle,
  currentAuthor,
  photo,
  role,
  is = "div",
}: Props) {
  const isTabContent = role === "tabpanel";

  return (
    <Card
      is={is}
      id={`panel-${handle}`}
      role={role}
      aria-labelledby={isTabContent ? handle : undefined}
      aria-hidden={isTabContent ? handle !== currentAuthor : false}
      display={
        isTabContent ? (handle === currentAuthor ? "flex" : "none") : "flex"
      }
      gap="2rem"
      flexWrap="wrap"
      alignItems="center"
    >
      <Pane
        flexBasis="100px"
        flexGrow={1}
        is="figure"
        textAlign="center"
        padding="0"
        margin="0"
      >
        <Image
          aspectRatio="1:1"
          src={photo.url}
          width={300}
          alt={fullName}
          fit="fill"
          radius={20}
          format="png"
        />
      </Pane>

      <Pane flexBasis="300px" flexGrow={3}>
        <Heading is="h4" size={700}>
          {fullName}
        </Heading>
        <Paragraph>{biography}</Paragraph>
      </Pane>
    </Card>
  );
}

export default AuthorDetails;
