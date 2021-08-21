import { Pane } from "evergreen-ui";
import { AuthorCard } from "@components";

interface Props {
  authors: Author[];
}

function AuthorList({ authors }: Props) {
  return (
    <Pane
      is="ul"
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
      paddingY="2rem"
      listStyle="none"
      padding="0"
      gap="1rem"
      justifyContent="center"
    >
      {authors.map(({ sys, fullName, photo }) => (
        <AuthorCard key={sys?.id} fullName={fullName} photo={photo} />
      ))}
    </Pane>
  );
}

export default AuthorList;
