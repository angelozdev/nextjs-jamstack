import { AuthorList, Wrapper } from "@components";
import { Heading, Pane } from "evergreen-ui";

interface Props {
  authors: Author[];
}

function AuthorsSection({ authors }: Props) {
  return (
    <Pane paddingY="2rem">
      <Wrapper maxWidth="1024px">
        <Pane>
          <Heading>Authors</Heading>
          <AuthorList authors={authors} />
        </Pane>
      </Wrapper>
    </Pane>
  );
}

export default AuthorsSection;
