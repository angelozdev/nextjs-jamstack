import { Image } from "@components";
import { Card, Pane, Paragraph } from "evergreen-ui";

interface Props {
  title: string;
  image: Asset;
}

function CategoryCard({ title, image }: Props) {
  return (
    <Card is="li" borderBottom paddingY=".5rem">
      <Pane display="flex" gap=".5rem" alignItems="center">
        <Pane flexBasis="50px" is="figure" margin="0" padding="0">
          <Image
            width={image.width}
            alt={`${title} - ${image.title}`}
            src={image.url}
            aspectRatio="1:1"
            fit="fill"
          />
        </Pane>

        <Pane flexGrow={1}>
          <Paragraph size={500}>{title}</Paragraph>
        </Pane>
      </Pane>
    </Card>
  );
}

export default CategoryCard;
