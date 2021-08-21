import { Pane, Paragraph } from "evergreen-ui";
import Image from "next/image";

function AuthorCard({ fullName, photo }: Partial<Author>) {
  return (
    <Pane is="li">
      {photo?.url && (
        <Image
          src={photo?.url}
          alt={photo.title}
          width={1}
          height={1}
          layout="responsive"
        />
      )}

      <Pane paddingY=".5rem" textAlign="center">
        <Paragraph size={500}>{fullName}</Paragraph>
      </Pane>
    </Pane>
  );
}

export default AuthorCard;
