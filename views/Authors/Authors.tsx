import { Fragment, useEffect, useState } from "react";
import { Heading, Pane, Paragraph, Tablist } from "evergreen-ui";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { getPlantsByAuthor } from "@api/services/plants";
import {
  AuthorTab,
  AuthorDetails,
  Wrapper,
  PlantList,
  Loader,
} from "@components";

interface Props {
  authors: Author[];
  currentAuthor: Author["handle"];
}

function Authors({ authors, currentAuthor }: Props) {
  const { query } = useRouter();
  const [plants, setPlants] = useState<Plant[] | null>(null);
  const { t } = useTranslation(["top-stories", "author-section"]);
  const areTherPlants = !!plants && !!plants?.length;
  const isLoading = plants === null;

  useEffect(() => {
    const author = query?.handle;
    if (typeof author !== "string" || !author) return;
    setPlants(null);
    getPlantsByAuthor(author, { limit: 10 })
      .then(setPlants)
      .catch(() => setPlants([]));
  }, [query?.handle]);

  return (
    <Pane is="section" paddingY="2rem">
      <Wrapper maxWidth="1280px">
        <Pane marginBottom="2rem" textAlign="center">
          <Heading is="h1" size={900}>
            {t("top-stories:title")}
          </Heading>
        </Pane>
        <Pane display="flex" gap="1rem" flexWrap="wrap">
          <Tablist flexDirection="column" flexBasis="200px" flexGrow={1}>
            {authors.map(({ handle, fullName }) => (
              <AuthorTab
                key={handle}
                fullName={fullName}
                handle={handle}
                currentAuthor={currentAuthor}
              />
            ))}
          </Tablist>
          <Pane flexBasis="500px" flexGrow={100}>
            <Pane>
              {authors.map(({ handle, biography, photo, fullName }) => (
                <AuthorDetails
                  key={handle}
                  handle={handle}
                  biography={biography}
                  photo={photo}
                  fullName={fullName}
                  currentAuthor={currentAuthor}
                  role="tabpanel"
                />
              ))}
            </Pane>

            <Pane borderTop paddingY="1rem" marginTop="2rem">
              {isLoading && <Loader />}
              {!areTherPlants && !isLoading && (
                <Paragraph>{t("posts_not_found")}</Paragraph>
              )}
              {areTherPlants && (
                <Fragment>
                  <Heading>{t("author-section:section.posts.title")}</Heading>
                  <PlantList plants={plants || []} />
                </Fragment>
              )}
            </Pane>
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Authors;
