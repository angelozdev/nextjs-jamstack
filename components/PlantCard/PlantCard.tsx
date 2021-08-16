import { Card, Pane, Paragraph } from "evergreen-ui";
import Image from "next/image";

function PlantCard({ image, plantName }: Partial<Plant>) {
  return (
    <Card is="li" hoverElevation={1} border>
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
        <Paragraph>{plantName}</Paragraph>
      </Pane>
    </Card>
  );
}

export default PlantCard;
