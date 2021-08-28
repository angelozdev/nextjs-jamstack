import { AuthorList, Wrapper } from "@components";
import { Heading, Pane } from "evergreen-ui";
import { useTranslation } from "next-i18next";

interface Props {
  authors: Author[];
}

function AuthorsSection({ authors }: Props) {
  const { t } = useTranslation("author-section");
  return (
    <Pane paddingY="2rem">
      <Wrapper maxWidth="1024px">
        <Pane>
          <Heading>{t("title")}</Heading>
          <AuthorList authors={authors} />
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default AuthorsSection;
