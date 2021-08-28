import { AuthorList, Wrapper } from "@components";
import { Heading, Pane } from "evergreen-ui";
import { useTranslation } from "hooks";

interface Props {
  authors: Author[];
}

function AuthorsSection({ authors }: Props) {
  const { t } = useTranslation();

  return (
    <Pane paddingY="2rem">
      <Wrapper maxWidth="1024px">
        <Pane>
          <Heading>{t({ id: "authors.section.title" })}</Heading>
          <AuthorList authors={authors} />
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default AuthorsSection;
