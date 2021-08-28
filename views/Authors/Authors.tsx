import { Heading, Pane, Tablist } from "evergreen-ui";
import { AuthorTab, AuthorTabContent, Wrapper } from "@components";
import { useTranslation } from "hooks";

interface Props {
  authors: Author[];
  currentAuthor: Author["handle"];
}

function Authors({ authors, currentAuthor }: Props) {
  const { t } = useTranslation();
  return (
    <Pane is="section" paddingY="2rem">
      <Wrapper maxWidth="1280px">
        <Pane marginBottom="2rem" textAlign="center">
          <Heading is="h1" size={900}>
            {t({ id: "top_stories.title" })}
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
            {authors.map(({ handle, biography, photo, fullName }) => (
              <AuthorTabContent
                key={handle}
                handle={handle}
                biography={biography}
                photo={photo}
                fullName={fullName}
                currentAuthor={currentAuthor}
              />
            ))}
          </Pane>
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default Authors;
