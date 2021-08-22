import { Pane, Paragraph } from "evergreen-ui";
import { Image } from "@components";

function AuthorCard({ fullName, photo }: Partial<Author>) {
  return (
    <Pane is="li">
      {photo?.url && (
        <Image
          src={photo?.url}
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
    </Pane>
  );
}

export default AuthorCard;
