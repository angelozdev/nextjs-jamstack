import { Card, Heading, Pane, Paragraph } from "evergreen-ui";
import { Image } from "@components";

interface Props {
  handle: Author["handle"];
  photo: Asset;
  fullName: Author["fullName"];
  biography: Author["biography"];
  currentAuthor: Author["handle"];
}

function AuthorTabContent({
  handle,
  photo,
  fullName,
  biography,
  currentAuthor,
}: Props) {
  return (
    <Card
      id={`panel-${handle}`}
      role="tabpanel"
      aria-labelledby={handle}
      aria-hidden={handle !== currentAuthor}
      display={handle === currentAuthor ? "flex" : "none"}
      gap="2rem"
      flexWrap="wrap"
      alignItems="center"
    >
      <Pane flexBasis="100px" flexGrow={1} is="figure" padding="0" margin="0">
        <Image
          aspectRatio="1:1"
          src={photo.url}
          width={photo.width}
          alt={fullName}
          fit="fill"
          radius={20}
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

export default AuthorTabContent;
