import { Badge, Heading, Pane, Paragraph } from "evergreen-ui";

import {
  CategorySection,
  Image,
  RecentPosts,
  RichText,
  Wrapper,
} from "@components";

interface Props {
  plant: Plant;
  categories: Category[];
  recentPosts: Plant[];
}

function SinglePlant({ plant, categories, recentPosts }: Props) {
  const { plantName, image, description, author, category } = plant;
  const { fullName, photo, biography } = author;
  const { title } = category;
  const text = description?.json;

  return (
    <Pane is="section">
      <Wrapper maxWidth="1280px">
        <Pane paddingY="1rem" display="flex" gap="1rem" flexWrap="wrap">
          <Pane flexBasis="600px" flexGrow={10}>
            {image?.url && (
              <Image
                src={image.url}
                alt={plantName}
                layout="responsive"
                width={image.width}
                aspectRatio="16:9"
                fit="fill"
              />
            )}

            <Pane marginY="2rem">
              <Heading
                is="h1"
                size={900}
                display="flex"
                alignItems="center"
                gap="1rem"
                flexWrap="wrap"
              >
                <span>{plantName}</span> <Badge color="green">{title}</Badge>
              </Heading>

              {text && <RichText document={text} />}

              <Pane
                paddingY="2rem"
                borderBottom
                borderTop
                display="flex"
                gap="1rem"
                flexWrap="wrap"
              >
                {photo?.url && (
                  <Pane flexBasis="200px">
                    <Image
                      src={photo.url}
                      layout="responsive"
                      width={photo.width}
                      fit="fill"
                      alt={fullName}
                      aspectRatio="1:1"
                    />
                  </Pane>
                )}
                <Pane paddingY="1rem" flexBasis="500px" flexGrow={1}>
                  <Heading size={700}>{fullName}</Heading>
                  <Paragraph>{biography}</Paragraph>
                </Pane>
              </Pane>
            </Pane>
          </Pane>

          <Pane
            flexGrow={1}
            flexBasis="300px"
            is="aside"
            display="flex"
            flexDirection="column"
            gap="2rem"
          >
            <RecentPosts recentPosts={recentPosts} />
            <CategorySection categories={categories} />
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default SinglePlant;
